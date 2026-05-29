import { Router } from 'express';
import multer from 'multer';
import CategoryController from './app/controllers/categoryController.js';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';

const routes = new Router();
const Upload = multer(multerConfig);

//metodos http: get --> buscar, post --> criar, put --> atualizar, delete --> deletar
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware); // Aplica o middleware de autenticação a todas as rotas abaixo desta linha
routes.post('/products', Upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);
routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

export default routes;
