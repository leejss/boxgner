const fs = require("fs");
const path = require("path");

function getFileExtension(filename) {
  const splited = filename.split(".");
  return splited.slice(1, splited.length).join(".");
}

function getFileName(filename) {
  return filename.split(".")[0];
}

function isFileExist(filename) {
  return fs.existsSync(path.join(process.cwd(), filename));
}

exports.getFileExtension = getFileExtension;
exports.getFileName = getFileName;
exports.isFileExist = isFileExist;
