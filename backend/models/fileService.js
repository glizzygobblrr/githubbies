const { PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3 = require('../awsConfig');

class FileService {
  static async uploadFile(bucketName, key, fileContent) {
    const params = { Bucket: bucketName, Key: key, Body: Buffer.from(fileContent, 'base64') };
    return s3.send(new PutObjectCommand(params));
  }

  static async deleteFile(bucketName, key) {
    const params = { Bucket: bucketName, Key: key };
    return s3.send(new DeleteObjectCommand(params));
  }

  static async listFiles(bucketName) {
    const params = { Bucket: bucketName };
    const data = await s3.send(new ListObjectsV2Command(params));
    return data.Contents ? data.Contents.map(file => file.Key) : [];
  }

  static async getFileUrl(bucketName, key) {
    const params = { Bucket: bucketName, Key: key };
    return getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
  }
}

module.exports = FileService;
