import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'categories',
        underscored: false, // 🛠️ Desativa a conversão automática para underlines
        createdAt: 'createdAt', // 🛠️ Mapeia para a coluna exata com maiúsculas do seu banco
        updatedAt: 'updatedAt', // 🛠️ Mapeia para a coluna exata com maiúsculas do seu banco
      },
    );
  }
}

export default Category;
