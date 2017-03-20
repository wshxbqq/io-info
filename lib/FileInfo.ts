import * as fs from "fs";
import * as shelljs from "shelljs";
import DirectoryInfo from "./DirectoryInfo";
import * as path from "path"


export default class FileInfo {
    constructor(directoryPath: string) {
        this.FullName = path.resolve(directoryPath)
    }
    //--------------- properties ------------
    Attributes: fs.Stats; //file size info 
    CreationTime: Date;
    LastAccessTime: Date;
    LastWriteTime: Date;
    Directory: DirectoryInfo; //return a DirectoryInfo instance
    DirectoryName: string;
    Exists: boolean;
    Extension: string;
    FullName: string;
    Length: number;
    Size: number;
    Name: string;

    //------------ functions ------------
    appendText(txt: String) {

    };
    delete(): void {
        if (fs.existsSync(this.FullName)) {
            fs.unlinkSync(this.FullName);
        }
    };

    /**
     * 
     * @param distPath 
     * @param cover 
     */
    copyTo(distPath: string, cover: boolean = false): void {
        if (!cover) {
            if (fs.existsSync(distPath)) {
                throw new Error("dist file exists");
            }
        }
        shelljs.cp(this.FullName, distPath);
    };

    /**
     * 
     * @param distPath 
     * @param cover 
     */
    moveTo(distPath: string, cover: boolean = false) {
        if (!cover) {
            if (fs.existsSync(distPath)) {
                throw new Error("dist file exists");
            }
        }
        shelljs.mv(this.FullName, distPath);
    };

    create(): void {
        shelljs.touch(this.FullName)
    };
}