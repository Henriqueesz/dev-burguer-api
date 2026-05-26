import express from 'express';
// 1. PRIMEIRO conectamos ao banco e inicializamos os models
import './database/index.js';

// 2. DEPOIS importamos as rotas (que usam os models já inicializados)
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));

export default app;
