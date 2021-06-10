const uuid = require('uuid');
const { S3 } = require('../utils/S3');
const { Crypto } = require('../utils/Crypto');
const { writeFile, deleteFile } = require('../utils/fileOps');

const uploadFile = async (fileObject) => {
  const crypto = new Crypto(process.env.CRYPTO_SECRET_KEY, process.env.CRYPTO_IV);
  if (fileObject.type === 'dataURI') {
    const base64Data = fileObject.data.replace(/^data:image\/png;base64,/, '');
    const tempFileName = `temp-${new Date().getTime()}-${uuid.v4()}.png`;
    await writeFile(tempFileName, base64Data, 'base64');
    const encryptedFileOutputStream = crypto.encryptAES(tempFileName);
    const s3 = new S3(process.env.AWS_S3_BUCKET_NAME);
    const { writeStream, uploadPromise } = s3.uploadFromStream();
    encryptedFileOutputStream.pipe(writeStream);
    encryptedFileOutputStream.on('finish', async () => {
      await deleteFile(tempFileName);
    });
    const s3Response = await uploadPromise;
    return {
      key: s3Response.Key,
    };
  }
  return {};
};

const downloadFile = async (key) => {
  const crypto = new Crypto(process.env.CRYPTO_SECRET_KEY, process.env.CRYPTO_IV);
  let encryptedfile = null;
  const s3 = new S3(process.env.AWS_S3_BUCKET_NAME);
  encryptedfile = await s3.downloadFile(key);
  const decryptedString = crypto.decryptAES(encryptedfile.Body);
  return decryptedString;
};

module.exports = {
  uploadFile,
  downloadFile,
};
