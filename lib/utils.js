function getFileExtension(filename) {
  const splited = filename.split(".");
  return splited.slice(1, splited.length).join(".");
}

function getFileName(filename) {
  return filename.split(".")[0];
}

exports.getFileExtension = getFileExtension;
exports.getFileName = getFileName;
