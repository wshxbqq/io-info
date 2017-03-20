"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var shelljs = require("shelljs");
var path = require("path");
var FileInfo_1 = require("./FileInfo");
var DirectoryInfo = (function () {
    function DirectoryInfo(directoryPath) {
        directoryPath = path.resolve(path.normalize(directoryPath));
        this._directoryPath = directoryPath;
    }
    Object.defineProperty(DirectoryInfo.prototype, "name", {
        get: function () {
            return path.basename(this._directoryPath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectoryInfo.prototype, "extension", {
        get: function () {
            return path.extname(this._directoryPath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectoryInfo.prototype, "fullName", {
        get: function () {
            return this._directoryPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectoryInfo.prototype, "root", {
        get: function () {
            if (this.exists) {
                var root = path.dirname(this._directoryPath);
                while (root != path.dirname(root)) {
                    root = path.dirname(root);
                }
                return new DirectoryInfo(root);
            }
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectoryInfo.prototype, "parentName", {
        get: function () {
            if (this.parent) {
                return this.parent.name;
            }
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectoryInfo.prototype, "parent", {
        get: function () {
            if (this.exists) {
                return new DirectoryInfo(path.dirname(this._directoryPath));
            }
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectoryInfo.prototype, "exists", {
        get: function () {
            return fs.existsSync(this._directoryPath) && fs.statSync(this._directoryPath).isDirectory();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectoryInfo.prototype, "attributes", {
        get: function () {
            if (this.exists) {
                return fs.statSync(this._directoryPath);
            }
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectoryInfo.prototype, "stat", {
        get: function () {
            if (this.exists) {
                return fs.statSync(this._directoryPath);
            }
            return;
        },
        enumerable: true,
        configurable: true
    });
    DirectoryInfo.prototype.delete = function () {
        if (!this.exists)
            return;
        shelljs.rm("-rf", this.fullName);
    };
    DirectoryInfo.prototype.copyTo = function (distPath) {
        if (!this.exists)
            return;
        shelljs.mkdir("-p", distPath);
        shelljs.cp("-R", this.fullName, distPath);
    };
    DirectoryInfo.prototype.moveTo = function (distPath) {
        if (!this.exists)
            return;
        shelljs.mkdir("-p", distPath);
        shelljs.mv(this.fullName, distPath);
    };
    DirectoryInfo.prototype.create = function () {
        shelljs.mkdir("-p", this.fullName);
    };
    ;
    DirectoryInfo.prototype.getFiles = function (topOnly, regFilter) {
        var _this = this;
        if (topOnly === void 0) { topOnly = true; }
        if (!this.exists)
            return;
        function arr2FileInfo(arr) {
            return arr.filter(function (item) {
                if (fs.existsSync(item) && fs.statSync(item).isFile()) {
                    if (regFilter) {
                        return item.match(regFilter).length;
                    }
                    else {
                        return true;
                    }
                }
            }).map(function (item) {
                return new FileInfo_1.default(item);
            });
        }
        if (topOnly) {
            return arr2FileInfo(shelljs.ls(this.fullName).map(function (item) {
                return path.join(_this.name, item);
            }));
        }
        else {
            return arr2FileInfo(shelljs.find(this.fullName));
        }
    };
    DirectoryInfo.prototype.getDirectories = function (topOnly, regFilter) {
        var _this = this;
        if (topOnly === void 0) { topOnly = true; }
        if (!this.exists)
            return;
        function arr2DirectoryInfo(arr) {
            return arr.filter(function (item) {
                if (fs.existsSync(item) && fs.statSync(item).isDirectory()) {
                    if (regFilter) {
                        return item.match(regFilter).length;
                    }
                    else {
                        return true;
                    }
                }
            }).map(function (item) {
                return new DirectoryInfo(item);
            });
        }
        if (topOnly) {
            return arr2DirectoryInfo(shelljs.ls(this.fullName).map(function (item) {
                return path.join(_this.name, item);
            }));
        }
        else {
            return arr2DirectoryInfo(shelljs.find(this.fullName));
        }
    };
    return DirectoryInfo;
}());
exports.default = DirectoryInfo;
