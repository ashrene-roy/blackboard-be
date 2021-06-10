const AWS = require('aws-sdk');
const uuid = require('uuid');
const stream = require('stream');

class S3 {

  constructor(bucketName) {
    this.s3 = new AWS.S3();
    this.bucketName = bucketName;
  }

  downloadFile(keyName) {
    let s3Params = {Bucket: this.bucketName, Key: keyName};
    return this.s3.getObject(s3Params).promise();
  }

  uploadFromStream() {
    let pass = new stream.PassThrough();
    let keyName = uuid.v4();
    let params = {Bucket: this.bucketName, Key: keyName, Body: pass};
    return {
      writeStream: pass,
      uploadPromise: this.s3.upload(params).promise()
    };
  }
}

module.exports = { S3 }