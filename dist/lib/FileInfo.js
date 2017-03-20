"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var shelljs = require("shelljs");
var path = require("path");
var DirectoryInfo_1 = require("./DirectoryInfo");
var FileInfo = (function () {
    function FileInfo(filePath) {
        filePath = path.resolve(path.normalize(filePath));
        this._filePath = filePath;
    }
    Object.defineProperty(FileInfo.prototype, "name", {
        get: function () {
            return path.basename(this._filePath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "extension", {
        get: function () {
            return path.extname(this._filePath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "fullName", {
        get: function () {
            return this._filePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "directoryName", {
        get: function () {
            if (this.directory) {
                return this.directory.name;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "directory", {
        get: function () {
            if (this.exists) {
                return new DirectoryInfo_1.default(path.dirname(this._filePath));
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "exists", {
        get: function () {
            return fs.existsSync(this._filePath) && fs.statSync(this._filePath).isFile();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "attributes", {
        get: function () {
            if (this.exists) {
                return fs.statSync(this._filePath);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "stat", {
        get: function () {
            if (this.exists) {
                return fs.statSync(this._filePath);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    FileInfo.prototype.delete = function () {
        if (!this.exists)
            return;
        shelljs.rm(this.fullName);
    };
    ;
    FileInfo.prototype.copyTo = function (distPath) {
        if (!this.exists)
            return;
        shelljs.mkdir("-p", path.dirname(distPath));
        shelljs.cp(this.fullName, distPath);
    };
    FileInfo.prototype.moveTo = function (distPath) {
        if (!this.exists)
            return;
        shelljs.mkdir("-p", path.dirname(distPath));
        shelljs.mv(this.fullName, distPath);
    };
    FileInfo.prototype.create = function () {
        if (!this.exists) {
            shelljs.mkdir("-p", path.dirname(this.fullName));
            shelljs.touch(this.fullName);
        }
    };
    ;
    return FileInfo;
}());
exports.default = FileInfo;
