/// <reference types="node" />
import * as fs from "fs";
import FileInfo from "./FileInfo";
export default class DirectoryInfo {
    private _directoryPath;
    constructor(directoryPath: string);
    readonly name: string;
    readonly extension: string;
    readonly fullName: string;
    readonly root: DirectoryInfo;
    readonly parentName: string;
    readonly parent: DirectoryInfo;
    readonly exists: boolean;
    readonly attributes: fs.Stats;
    readonly stat: fs.Stats;
    delete(): void;
    copyTo(distPath: string): void;
    moveTo(distPath: string): void;
    create(): void;
    getFiles(topOnly?: boolean, regFilter?: RegExp): FileInfo[];
    getDirectories(topOnly?: boolean, regFilter?: RegExp): DirectoryInfo[];
}
