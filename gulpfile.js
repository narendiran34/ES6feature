var gulp = require("gulp");
var gulpMocha = require("gulp-mocha");
var env = require("gulp-env");
var supertest = require("supertest");

gulp.task('test', function () {
	env ({vars: {ENV: 'Test'}});
	var stream = gulp.src('src/app/api/Tests/*.js', {read: false})
		.pipe(gulpMocha({reporter: 'nyan', exit: true}))
});
