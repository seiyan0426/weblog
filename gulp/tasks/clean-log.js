var gulp = require("gulp");
var del = require("del");

var config = require("../config.js");

gulp.task("clean-log", () => {
    return del("./**/*", { cwd: config.path.log });
});