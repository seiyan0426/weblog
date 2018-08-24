var gulp = require("gulp");
var del = require("del");

var config = require("../config.js");

// 削除
gulp.task("copy-images.clean", () => {
    return del("./images/**/*", { cwd: config.path.output });
});

// コピー
gulp.task("copy-images", ["copy-images.clean"], () => {
    gulp.src("./images/**/*", { cwd: config.path.input })
        .pipe(gulp.dest("./images", { cwd: config.path.output }));
});