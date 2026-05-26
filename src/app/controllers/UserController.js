/*
metodo store: criar um novo usuário
metodo index: listar os usuários
metodo show: mostrar um usuário específico
metodo update: atualizar um usuário específico
metodo delete: deletar um usuário específico

no pradrao mvc o controller é responsável por receber as requisições,
processar os dados e retornar as respostas. 
Ele atua como uma ponte entre as rotas e os modelos, garantindo que a lógica de negócios 
seja separada da lógica de apresentação. O controller recebe as requisições das rotas, 
interage com os modelos para acessar ou modificar os dados e, em seguida, 
retorna a resposta apropriada para o cliente. 

cada um desses métodos (store, index, show, update, delete) é responsável por uma operação
específica relacionada aos usuários. e nao se repete.
caso haja a necessidade de repetir o metodo, pode ser viavel criar um outro controller, 
ou seja, um controller para cada recurso (ex: UserController, ProductController, etc) 
para manter a organização e a clareza do código.
*/
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // ⚠️ Correção 1: Import do UUID com apelido padrão
// ⚠️ Correção 2: Buscando da Database (com chaves) para o Sequelize não dar erro de "undefined"
import * as Yup from 'yup';
import User from '../models/User.js';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (err) {
      console.error('Validation error:', err);
      return res
        .status(400)
        .json({ error: 'Validation failed', details: err.errors });
    }
    try {
      // ⚠️ Correção 3: Mudado de "request.body" para "req.body" (igual ao parâmetro da função)
      const { name, email, password, admin } = req.body;

      // Boa prática: Verificar se o e-mail já existe
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
      const password_hash = await bcrypt.hash(password, 10);

      const user = await User.create({
        id: uuidv4(), // Usando a função importada corretamente
        name,
        email,
        password_hash,
        admin: admin || false,
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Erro interno no servidor', details: error.message });
    }
  }
}

export default new UserController();
