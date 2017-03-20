/// <reference types="node" />
import * as fs from "fs";
import FileInfo from "./FileInfo";
export default class DirectoryInfo {
    constructor(directoryPath: string);
    Attributes: fs.Stats;
    CreationTime: Date;
    LastAccessTime: Date;
    LastWriteTime: Date;
    Parent: DirectoryInfo;
    Root: DirectoryInfo;
    Exists: boolean;
    Extension: string;
    FullName: string;
    Length: number;
    size: number;
    name: string;
    delete(): void;
    moveTo(distPath: string): void;
    create(): void;
    getFiles(topOnly?: boolean, regFilter?: RegExp): FileInfo[];
    getDirectories(topOnly?: boolean, regFilter?: RegExp): FileInfo[];
}
