import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        category: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3000/product-files/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
        underscored: false, // 🛠️ Força o Sequelize a NÃO usar underlines
        createdAt: 'createdAt', // 🛠️ Mapeia explicitamente para a coluna com letras maiúsculas
        updatedAt: 'updatedAt', // 🛠️ Mapeia explicitamente para a coluna com letras maiúsculas
      },
    );
  }
}

export default Product;
