module.exports=function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		uglify:{
			options: {
			  //对当前日期进行格式化 
		      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		    },
		    // static_mappings: {
		    // 	files:[{
		    // 		src:'js/index.js',
		    // 		dest: 'build/index.min.js'
		    // 	},{
		    // 		src: 'js/main.js',
		    // 		dest: 'build/main.min.js'
		    // 	}]
		    // }
		    my_target: {
	            files: [
					{
						expand: true,
						//相对路径
						cwd: 'js/',
						src: '*.js',
						dest: 'build/',
						rename: function (dest, src) {  
							  var folder = src.substring(0, src.lastIndexOf('/'));  
							  var filename = src.substring(src.lastIndexOf('/'), src.length);  
							  //  var filename=src;  
							  filename = filename.substring(0, filename.lastIndexOf('.'));  
							  var fileresult=dest + folder + filename + '.min.js';  
							  grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  
							  return fileresult;  
							  //return  filename + '.min.js';  
						} 
					}
	            ]
			}
		},
		concat:{
			bar:{
				src:['build/*.js'],
				dest:'dest/all.min.js'
			}
		},
		watch:{
			files:['js/*.js'],
			tasks:['uglify','concat']
		}
	});
	// 加载包含“uglify”任务的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// 默认被执行的任务列表
	grunt.registerTask('default',['uglify','concat','watch']);
}