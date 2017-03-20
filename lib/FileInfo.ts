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

    get name(): string | null {

        return path.basename(this._filePath);

    }

    get extension(): string {
        return path.extname(this._filePath);
    }


    get fullName(): string {
        return this._filePath;
    }

    get directoryName(): string | null {
        if (this.directory) {
            return this.directory.name;
        }
        return null;
    }


    get directory(): DirectoryInfo | null {
        if (this.exists) {
            return new DirectoryInfo(path.dirname(this._filePath));
        }
        return null;
    }

    get exists(): boolean {
        return fs.existsSync(this._filePath) && fs.statSync(this._filePath).isFile();
    }

    get attributes(): fs.Stats | null {
        if (this.exists) {
            return fs.statSync(this._filePath);
        }
        return null;
    }

    get stat(): fs.Stats | null {
        if (this.exists) {
            return fs.statSync(this._filePath);
        }
        return null;
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
    }
    moveTo(distPath: string) {
        if (!this.exists) return;
        shelljs.mkdir("-p", path.dirname(distPath));
        shelljs.mv(this.fullName, distPath);
    }
    create(): void {
        if (!this.exists) {
            shelljs.mkdir("-p", path.dirname(this.fullName));
            shelljs.touch(this.fullName)
        }
    };
}

