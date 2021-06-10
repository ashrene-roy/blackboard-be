const { Router } = require('express');
const { uploadFile, downloadFile } = require('../handlers/file.handler');

const router = Router();

router.post('/upload', uploadFile);
router.get('/download/:id', downloadFile);

module.exports = { router };
