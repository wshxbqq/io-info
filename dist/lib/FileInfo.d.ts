/// <reference types="node" />
import * as fs from "fs";
import DirectoryInfo from "./DirectoryInfo";
export default class FileInfo {
    private _filePath;
    constructor(filePath: string);
    readonly name: string | null;
    readonly extension: string;
    readonly fullName: string;
    readonly directoryName: string | null;
    readonly directory: DirectoryInfo | null;
    readonly exists: boolean;
    readonly attributes: fs.Stats | null;
    readonly stat: fs.Stats | null;
    delete(): void;
    copyTo(distPath: string): void;
    moveTo(distPath: string): void;
    create(): void;
}
