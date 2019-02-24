const path = require("path");
const fs = require("fs");

//功能：读取某文件夹下所有文件路径并以数组形式返回（无嵌套）
//参数：某个文件夹路径
function readdir(dirPath) {
  //获得该文件夹下的所有文件夹名或文件名，数组
  const files = fs.readdirSync(dirPath);
  const fileArr = files.map(file => {
    //获得该文件夹下当前文件夹或文件的完整路径
    let filePath = path.resolve(dirPath, file);
    //如果是文件夹则递归，否则返回文件路径
    if (fs.statSync(filePath).isDirectory()) {
      return readdir(filePath);
    }
    return filePath;
  });
  //注意最后不能直接返回所有文件路径的数组，否则对于每个文件夹，
  //返回的都是数组，这样可能最终结果是数组包含数组，而期望的结果是所有文件路径的数组
  return [].concat(...fileArr);
  //return concat(fileArr);
}

module.exports = readdir;

//参考处写了这么个方法用来将每次生成的数组包含数组的数据格式([[1,2],[3,4]])转为
//一个无嵌套数组的格式([1,2,3,4])，实际不用这么麻烦，因为用上述readdir方法时只
//有碰到文件夹下有文件夹时才会有数组嵌套数组的情况，而子文件夹下还有文件夹时会再次
//递归，这里好像会产生多于两层的嵌套，那么可以每次嵌套时先解套再返回。也就是说在这
//种递归的情况下所要考虑的永远只有双层嵌套的情况，只要完成双层嵌套的转换，所返回的
//无嵌套数组参与到下一个函数栈时([1,2,3,4],6,7,[8,9])可继续被转成无嵌套格式。
//所有除非是两层以上的多层嵌套数组，并不需要如下方法。
function concat(...args) {
  var arr = [];
  args.forEach(item => {
    if (Array.isArray(item)) {
      return arr.push(...concat(...item));
    }
    arr.push(item);
  });
  return arr;
}
