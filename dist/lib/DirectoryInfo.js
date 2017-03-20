"use strict";
var fs = require("fs");
var FileInfo_1 = require("./FileInfo");
var shelljs = require("shelljs");
var path = require("path");
var DirectoryInfo = (function () {
    function DirectoryInfo(directoryPath) {
        var stats = fs.statSync(directoryPath);
        this.FullName = path.resolve(directoryPath);
        this.Attributes = stats;
        this.CreationTime = stats.birthtime;
        this.LastAccessTime = stats.atime;
        this.LastWriteTime = stats.mtime;
        this.Parent = new DirectoryInfo(path.dirname(directoryPath));
        this.length = stats.size;
        this.size = stats.size;
        this.name = path.resolve(directoryPath);
    }
    DirectoryInfo.prototype["delete"] = function () {
        shelljs.rm("-rf", this.FullName);
    };
    DirectoryInfo.prototype.moveTo = function (distPath) {
        shelljs.mv([this.FullName], distPath);
    };
    DirectoryInfo.prototype.create = function () {
        shelljs.mkdir("-p", this.FullName);
    };
    ;
    DirectoryInfo.prototype.getFiles = function (topOnly, regFilter) {
        if (topOnly === void 0) { topOnly = true; }
        function arr2FileInfo(arr) {
            return arr.filter(function (item) {
                var absPath = path.resolve(item);
                if (fs.statSync(absPath).isFile()) {
                    if (regFilter) {
                        return absPath.replace(path.normalize(item), '').match(regFilter).length;
                    }
                    else {
                        return true;
                    }
                }
                return fs.statSync(absPath).isFile();
            }).map(function (item) {
                return new FileInfo_1["default"](item);
            });
        }
        if (topOnly) {
            return arr2FileInfo(shelljs.ls(this.FullName));
        }
        else {
            return arr2FileInfo(shelljs.find(this.FullName));
        }
    };
    DirectoryInfo.prototype.getDirectories = function (topOnly, regFilter) {
        if (topOnly === void 0) { topOnly = true; }
        function arr2DirectoryInfo(arr) {
            return arr.filter(function (item) {
                var absPath = path.resolve(item);
                if (fs.statSync(absPath).isDirectory()) {
                    if (regFilter) {
                        return absPath.replace(path.normalize(item), '').match(regFilter).length;
                    }
                    else {
                        return true;
                    }
                }
                return fs.statSync(absPath).isFile();
            }).map(function (item) {
                return new FileInfo_1["default"](item);
            });
        }
        if (topOnly) {
            return arr2DirectoryInfo(shelljs.ls(this.FullName));
        }
        else {
            return arr2DirectoryInfo(shelljs.find(this.FullName));
        }
    };
    return DirectoryInfo;
}());
exports.__esModule = true;
exports["default"] = DirectoryInfo;
