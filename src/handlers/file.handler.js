const fileService = require('../services/file.service');

const uploadFile = async (req, res) => {
  let uploadResponse = null;
  try {
    uploadResponse = await fileService.uploadFile(req.body);
  } catch (err) {
    return res.status(500).send(err);
  }
  return res.status(200).send(uploadResponse);
};

const downloadFile = async (req, res) => {
  let downloadedFile = null;
  try {
    downloadedFile = await fileService.downloadFile(req.params.id);
  } catch (err) {
    return res.status(500).send(err);
  }

  const img = Buffer.from(downloadedFile, 'base64');
  res.attachment('image.png');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length,
  });
  return res.end(img);
};

module.exports = {
  uploadFile,
  downloadFile,
};
