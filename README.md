# node-io-info

node file api ,  just like FileInfo &amp; DirectoryInfo  Class in C# 

typescript enabled

__install:__

```
npm install io-info
```

API:

__FileInfo__

```
//just like FileInfo in c#.net
const io = require("io-info")
let f1 = new io.FileInfo("simple/1.txt");
f1.create();
f1.attributes;
f1.exists;
f1.copyTo("dir3");
f1.moveTo("dir2");
f1.length;
...
io.FileInfo.writeAllText(f1.fullName,"some test");
io.FileInfo.readAllText(f1.fullName)
...

```

__DirectoryInfo__

```
//just like DirectoryInfo in c#.net
const io = require("io-info")
let d1 = new io.DirectoryInfo("simple");
d1.copyTo("simple1");
d1.size;
d1.copyTo("dir4");
d1.delete();
d1.exists;
...
...

```
