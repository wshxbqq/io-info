import * as fs from "fs";
import * as shelljs from "shelljs";
import * as path from "path"
import FileInfo from "./FileInfo"


export default class DirectoryInfo {
    private _directoryPath: string;

    constructor(directoryPath: string) {
        directoryPath = path.resolve(path.normalize(directoryPath));
        this._directoryPath = directoryPath;
    }

    get name(): string {
        return path.basename(this._directoryPath);
    }

    get extension(): string {
        return path.extname(this._directoryPath);
    }

    get fullName(): string {
        return this._directoryPath;
    }

    get root(): DirectoryInfo {
        if (this.exists) {
            let root = path.dirname(this._directoryPath);
            while (root != path.dirname(root)) {
                root = path.dirname(root);
            }
            return new DirectoryInfo(root);
        }
        return;
    }

    get parentName(): string {
        if (this.parent) {
            return this.parent.name;
        }
        return;
    }


    get parent(): DirectoryInfo {
        if (this.exists) {
            return new DirectoryInfo(path.dirname(this._directoryPath));
        }
        return;
    }

    get exists(): boolean {
        return fs.existsSync(this._directoryPath) && fs.statSync(this._directoryPath).isDirectory();
    }

    get attributes(): fs.Stats {
        if (this.exists) {
            return fs.statSync(this._directoryPath);
        }
        return;
    }

    get stat(): fs.Stats {
        if (this.exists) {
            return fs.statSync(this._directoryPath);
        }
        return;
    }

    /**
     * folder size
     */
    get size(): number {
        let size = 0;
        if (this.exists) {
            this.getFiles(true).map(item => {
                size += item.size;
            })
        }
        return size;
    }

    /**
     * synonym with size
     */
    get length(): number {
        return this.size;
    }

    //------------ functions ------------
    delete(): void {
        if (!this.exists) return;
        shelljs.rm("-rf", this.fullName)
    }
    copyTo(distPath: string) {
        if (!this.exists) return;
        shelljs.mkdir("-p",path.dirname(distPath));
        shelljs.cp("-R", this.fullName, distPath);
    }
    moveTo(distPath: string) {
        if (!this.exists) return;
        shelljs.mkdir("-p", path.dirname(distPath));
        shelljs.mv(this.fullName, distPath);
    }
    create(): void {
        shelljs.mkdir("-p", this.fullName)
    };

    getFiles(recursion: boolean = false, regFilter?: RegExp): FileInfo[] {
        if (!this.exists) return;
        function arr2FileInfo(arr: string[]): FileInfo[] {
            return arr.filter(item => {
                if (fs.existsSync(item) && fs.statSync(item).isFile()) {
                    if (regFilter) {
                        return item.match(regFilter).length;
                    } else {
                        return true;
                    }
                }
            }).map(item => {
                return new FileInfo(item);
            })
        }
        if (!recursion) {
            return arr2FileInfo(shelljs.ls(this.fullName).map(item => {
                return path.join(this.name, item)
            }));
        } else {
            return arr2FileInfo(shelljs.find(this.fullName));
        }
    }

    getDirectories(recursion: boolean = false, regFilter?: RegExp): DirectoryInfo[] {
        if (!this.exists) return;
        function arr2DirectoryInfo(arr: string[]): DirectoryInfo[] {
            return arr.filter(item => {
                if (fs.existsSync(item) && fs.statSync(item).isDirectory()) {
                    if (regFilter) {
                        return item.match(regFilter).length;
                    } else {
                        return true;
                    }
                }
            }).map(item => {
                return new DirectoryInfo(item);
            })
        }
        if (!recursion) {
            return arr2DirectoryInfo(shelljs.ls(this.fullName).map(item => {
                return path.join(this.name, item)
            }));
        } else {
            return arr2DirectoryInfo(shelljs.find(this.fullName));
        }
    }
}
