import FileInfo from "../lib/FileInfo"
import DirectoryInfo from "../lib/DirectoryInfo"

let f1 = new FileInfo("simple/1.txt");
f1.create();

let f2 = new FileInfo("simple/foo/bar/2.txt");
f2.create();

let d1 = new DirectoryInfo("simple");
d1.copyTo("simple1");

console.log(d1.getFiles(true));




 
