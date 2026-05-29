import Sequelize from 'sequelize';
import Product from '../app/models/product.js';
import User from '../app/models/User.js';
import configDatabase from '../config/database.cjs';
import Category from '../app/models/category.js';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);

    // Inicializa cada model passando a conexão
    models.map((model) => model.init(this.connection));
  }
}

// Inicializa a classe aqui
new Database();

// EXPORTE O USER DAQUI DE DENTRO!
// Isso garante que quem importar o User vai pegar ele já inicializado pelo Sequelize.
export { User };
