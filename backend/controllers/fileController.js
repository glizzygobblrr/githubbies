const FileService = require('../models/fileService');

const uploadFile = async (req, res) => {
  const { bucketName, fileContent, key } = req.body;
  try {
    await FileService.uploadFile(bucketName, key, fileContent);
    res.status(200).json({ message: 'File uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed.' });
  }
};

const deleteFile = async (req, res) => {
  const { bucketName, key } = req.body;
  try {
    await FileService.deleteFile(bucketName, key);
    res.status(200).json({ message: 'File deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'File deletion failed.' });
  }
};

const listFiles = async (req, res) => {
  const bucketName = req.query.bucketName || process.env.S3_BUCKET_NAME;
  try {
    const files = await FileService.listFiles(bucketName);
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list files.' });
  }
};

const getFileUrl = async (req, res) => {
  const { key } = req.params;
  const bucketName = req.query.bucketName || process.env.S3_BUCKET_NAME;
  try {
    const url = await FileService.getFileUrl(bucketName, key);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get file URL.' });
  }
};

module.exports = { uploadFile, deleteFile, listFiles, getFileUrl };