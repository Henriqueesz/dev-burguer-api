const { resolve } = require('node:path');
const express = require('express');

// Alterado de 'uploads' para 'upload' para coincidir com a sua pasta
const uploadPath = resolve(__dirname, '..', '..', 'uploads');

// Servindo a pasta como estática
const filesRoutesConfig = express.static(uploadPath);

module.exports = filesRoutesConfig;
