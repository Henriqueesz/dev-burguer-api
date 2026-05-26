import Sequelize from 'sequelize';
import configDatabase from '../config/database.cjs';
import User from '../app/models/User.js';

const models = [User];

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
