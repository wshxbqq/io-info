/// <reference types="node" />
import * as fs from "fs";
import DirectoryInfo from "./DirectoryInfo";
export default class FileInfo {
    constructor(directoryPath: string);
    Attributes: fs.Stats;
    CreationTime: Date;
    LastAccessTime: Date;
    LastWriteTime: Date;
    Directory: DirectoryInfo;
    DirectoryName: string;
    Exists: boolean;
    Extension: string;
    FullName: string;
    Length: number;
    Size: number;
    Name: string;
    appendText(txt: String): void;
    delete(): void;
    copyTo(distPath: string, cover?: boolean): void;
    moveTo(distPath: string, cover?: boolean): void;
    create(): void;
}
