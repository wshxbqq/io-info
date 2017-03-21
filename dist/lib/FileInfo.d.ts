/// <reference types="node" />
import * as fs from "fs";
import DirectoryInfo from "./DirectoryInfo";
export default class FileInfo {
    private _filePath;
    constructor(filePath: string);
    readonly name: string | null;
    readonly extension: string;
    readonly fullName: string;
    readonly directoryName: string;
    readonly directory: DirectoryInfo;
    readonly exists: boolean;
    readonly attributes: fs.Stats;
    readonly stat: fs.Stats;
    readonly size: number;
    readonly length: number;
    delete(): void;
    copyTo(distPath: string): void;
    moveTo(distPath: string): void;
    create(): void;
    buffer(): Buffer;
    stringContent(encoding?: string): string;
    static writeAllText(filePath: string, content?: string, encoding?: string): void;
    static readAllTextBuffer(filePath: string): Buffer;
    static readAllText(filePath: string, encoding?: string): string;
}
