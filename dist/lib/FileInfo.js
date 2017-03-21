"use strict";
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "directory", {
        get: function () {
            if (this.exists) {
                return new DirectoryInfo_1.default(path.dirname(this._filePath));
            }
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "stat", {
        get: function () {
            if (this.exists) {
                return fs.statSync(this._filePath);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "size", {
        get: function () {
            if (this.exists) {
                return this.stat.size;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileInfo.prototype, "length", {
        get: function () {
            return this.size;
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
    FileInfo.prototype.buffer = function () {
        if (this.exists) {
            return fs.readFileSync(this.fullName);
        }
    };
    FileInfo.prototype.stringContent = function (encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        var buffer = this.buffer();
        if (buffer) {
            return buffer.toString(encoding);
        }
    };
    FileInfo.writeAllText = function (filePath, content, encoding) {
        if (content === void 0) { content = ""; }
        if (encoding === void 0) { encoding = "utf-8"; }
        shelljs.mkdir("-p", path.dirname(filePath));
        fs.writeFileSync(filePath, content, {
            encoding: encoding
        });
    };
    ;
    FileInfo.readAllTextBuffer = function (filePath) {
        var file = new FileInfo(filePath);
        if (file.exists) {
            return fs.readFileSync(filePath);
        }
    };
    FileInfo.readAllText = function (filePath, encoding) {
        if (encoding === void 0) { encoding = "utf8"; }
        var buffer = FileInfo.readAllTextBuffer(filePath);
        if (buffer) {
            return buffer.toString(encoding);
        }
    };
    return FileInfo;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileInfo;
//# sourceMappingURL=FileInfo.js.map