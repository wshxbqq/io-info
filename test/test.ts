import * as io from ".."
let f1 = new io.FileInfo("simple/1.txt");
f1.create();
f1.copyTo("2/1.txt")
f1.attributes;
f1.exists;
f1.copyTo("dir3");
f1.moveTo("dir2");
f1.length;

io.FileInfo.writeAllText(f1.fullName,"some test");
io.FileInfo.readAllText(f1.fullName)


let d1 = new io.DirectoryInfo("simple");
d1.copyTo("simple1");
d1.size;
d1.copyTo("dir4");
d1.delete();
d1.exists;







 
