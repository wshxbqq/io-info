import * as fs from "fs";
import * as shelljs from "shelljs";
import * as path from "path"
import DirectoryInfo from "./DirectoryInfo";

export default class FileInfo {
    private _filePath: string;

    constructor(filePath: string) {
        filePath = path.resolve(path.normalize(filePath));
        this._filePath = filePath;
    }

    get name(): string {
        return path.basename(this._filePath);
    }

    get extension(): string {
        return path.extname(this._filePath);
    }

    get fullName(): string {
        return this._filePath;
    }

    get directoryName(): string {
        if (this.directory) {
            return this.directory.name;
        }
    }


    get directory(): DirectoryInfo {
        if (this.exists) {
            return new DirectoryInfo(path.dirname(this._filePath));
        }
    }

    get exists(): boolean {
        return fs.existsSync(this._filePath) && fs.statSync(this._filePath).isFile();
    }

    get attributes(): fs.Stats {
        if (this.exists) {
            return fs.statSync(this._filePath);
        }
    }

    get stat(): fs.Stats {
        if (this.exists) {
            return fs.statSync(this._filePath);
        }
    }

    get size(): number {
        if (this.exists) {
            return this.stat.size;
        }
        return 0;
    }

    get length(): number {
        return this.size;
    }



    //------------ functions ------------
    delete(): void {
        if (!this.exists) return;
        shelljs.rm(this.fullName);
    };
    copyTo(distPath: string) {
        if (!this.exists) return;
        shelljs.mkdir("-p", path.dirname(distPath));
        shelljs.cp(this.fullName, distPath);
    };
    moveTo(distPath: string) {
        if (!this.exists) return;
        shelljs.mkdir("-p", path.dirname(distPath));
        shelljs.mv(this.fullName, distPath);
    };
    create(): void {
        if (!this.exists) {
            shelljs.mkdir("-p", path.dirname(this.fullName));
            shelljs.touch(this.fullName)
        }
    };

    buffer(): Buffer {
        if (this.exists) {
            return fs.readFileSync(this.fullName);
        }
    };

    stringContent(encoding: string = "utf-8"): string {
        let buffer = this.buffer();
        if (buffer) {
            return buffer.toString(encoding);
        }
    };

    public static writeAllText(filePath: string, content: string = "", encoding: string = "utf-8"): void {
        shelljs.mkdir("-p", path.dirname(filePath));
        fs.writeFileSync(filePath, content, {
            encoding: encoding
        })
    };


    public static readAllTextBuffer(filePath: string): Buffer {
        let file = new FileInfo(filePath);
        if (file.exists) {
            return fs.readFileSync(filePath)
        }
    };

    public static readAllText(filePath: string, encoding: string = "utf8"): string {
        let buffer = FileInfo.readAllTextBuffer(filePath);
        if (buffer) {
            return buffer.toString(encoding);
        }
    };
}

