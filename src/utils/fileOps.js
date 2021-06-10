const fs = require('fs');

const writeFile = (fileName, content, options) => {
  const writeFilePromise = new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, options, (err, data) => {
      if (err) reject(err.message);
      resolve(data);
    });
  });
  return writeFilePromise;
};

const deleteFile = (fileName) => {
  const deleteFilePromise = new Promise((resolve, reject) => {
    fs.unlink(fileName, (err, data) => {
      if (err) reject(err.message);
      resolve(data);
    });
  });
  return deleteFilePromise;
};

module.exports = {
  writeFile,
  deleteFile,
};
