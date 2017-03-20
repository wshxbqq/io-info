"use strict";
var fs = require("fs");
var shelljs = require("shelljs");
var path = require("path");
var FileInfo = (function () {
    function FileInfo(directoryPath) {
        this.FullName = path.resolve(directoryPath);
    }
    FileInfo.prototype.appendText = function (txt) {
    };
    ;
    FileInfo.prototype["delete"] = function () {
        if (fs.existsSync(this.FullName)) {
            fs.unlinkSync(this.FullName);
        }
    };
    ;
    FileInfo.prototype.copyTo = function (distPath, cover) {
        if (cover === void 0) { cover = false; }
        if (!cover) {
            if (fs.existsSync(distPath)) {
                throw new Error("dist file exists");
            }
        }
        shelljs.cp(this.FullName, distPath);
    };
    ;
    FileInfo.prototype.moveTo = function (distPath, cover) {
        if (cover === void 0) { cover = false; }
        if (!cover) {
            if (fs.existsSync(distPath)) {
                throw new Error("dist file exists");
            }
        }
        shelljs.mv(this.FullName, distPath);
    };
    ;
    FileInfo.prototype.create = function () {
        shelljs.touch(this.FullName);
    };
    ;
    return FileInfo;
}());
exports.__esModule = true;
exports["default"] = FileInfo;
