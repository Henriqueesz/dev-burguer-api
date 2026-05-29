import express from 'express';
import './database/index.js';

import routes from './routes.js';
import filesRoutesConfig from './config/filleRoutes.cjs';

const app = express();

// 1. Middlewares globais e configuradores (Devem vir primeiro)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Rota para servir os arquivos de imagem (Antes das rotas principais)
app.use('/product-files', filesRoutesConfig);

// 3. Suas rotas da API
app.use(routes);

export default app;
