import * as fs from "fs";
import FileInfo from "./FileInfo"
import * as shelljs from "shelljs";
import * as path from "path"

export default class DirectoryInfo {
    constructor(directoryPath: string) {
        let stats = fs.statSync(directoryPath);
        this.FullName = path.resolve(directoryPath);
        this.Attributes = stats;
        this.CreationTime = stats.birthtime;
        this.LastAccessTime = stats.atime;
        this.LastWriteTime = stats.mtime;
        this.Parent = new DirectoryInfo(path.dirname(directoryPath));
        //this.Root = path.resolve(directoryPath);
        this.length = stats.size;
        this.size = stats.size;
        this.name = path.resolve(directoryPath);

    }
    //--------------- properties ------------
    Attributes: fs.Stats; //file size info 
    CreationTime: Date;
    LastAccessTime: Date;
    LastWriteTime: Date;
    Parent: DirectoryInfo; //return a DirectoryInfo instance
    Root: DirectoryInfo;
    Exists: boolean;
    Extension: string;
    FullName: string;
    Length: number;
    size: number;
    name: string;

    //------------ functions ------------

    delete(): void {
        shelljs.rm("-rf", this.FullName)
    }

    moveTo(distPath: string) {
        shelljs.mv([this.FullName], distPath);
    }
    create(): void {
        shelljs.mkdir("-p", this.FullName)
    };

    getFiles(topOnly: boolean = true, regFilter?: RegExp): FileInfo[] {
        function arr2FileInfo(arr: string[]): FileInfo[] {
            return arr.filter(item => {
                let absPath = path.resolve(item);
                if (fs.statSync(absPath).isFile()) {
                    if (regFilter) {
                        return absPath.replace(path.normalize(item), '').match(regFilter).length;
                    } else {
                        return true;
                    }
                }
                return fs.statSync(absPath).isFile()
            }).map(item => {
                return new FileInfo(item);
            })
        }
        if (topOnly) {
            return arr2FileInfo(shelljs.ls(this.FullName));
        } else {
            return arr2FileInfo(shelljs.find(this.FullName));
        }
    }

    getDirectories(topOnly: boolean = true, regFilter?: RegExp) {
        function arr2DirectoryInfo(arr: string[]): FileInfo[] {
            return arr.filter(item => {
                let absPath = path.resolve(item);
                if (fs.statSync(absPath).isDirectory()) {
                    if (regFilter) {
                        return absPath.replace(path.normalize(item), '').match(regFilter).length;
                    } else {
                        return true;
                    }
                }
                return fs.statSync(absPath).isFile()
            }).map(item => {
                return new FileInfo(item);
            })
        }

        if (topOnly) {
            return arr2DirectoryInfo(shelljs.ls(this.FullName));
        } else {
            return arr2DirectoryInfo(shelljs.find(this.FullName));
        }
    }
}

