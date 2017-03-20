import FileInfo from "../lib/FileInfo"
import DirectoryInfo from "../lib/DirectoryInfo"

// let f1 = new FileInfo("aaa/bbb/ccc/ddd/f1.txt");

// f1.create();


// let f2 = new FileInfo("f2.txt");
// console.log(f2.exists);
// f2.create();
// console.log(f2.exists);
// f2.moveTo("./aaa/bbb")


// let f3 = new FileInfo("f3.txt");
// f3.create();
// console.log(f3.fullName);
// f3.delete();


let d1 = new DirectoryInfo("aaa");

console.log(d1.getFiles(false)[0].delete()) 



 