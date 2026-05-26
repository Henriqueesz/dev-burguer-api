/**@type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER, // 1, 2, 3, ...
        allowNull: false, // não pode ser nulo
        primaryKey: true, // chave primária
        autoIncrement: true, // auto-incremento
      },
      name: {
        type: Sequelize.STRING(), // 'Produto A', 'Produto B', ...
        allowNull: false, // não pode ser nulo
      },
      price: {
        type: Sequelize.DECIMAL(10, 2), // 19.99, 49.90, ...
        allowNull: false, // não pode ser nulo
      },
      path: {
        type: Sequelize.STRING(), // 'Eletrônicos', 'Roupas', ...
        allowNull: false, // não pode ser nulo
      },
      category: {
        type: Sequelize.STRING(), // 'Eletrônicos', 'Roupas', ...
        allowNull: false, // não pode ser nulo
      },
      createdAt: {
        type: Sequelize.DATE(), // data de criação
        allowNull: false, // não pode ser nulo
      },
      updatedAt: {
        type: Sequelize.DATE(), // data de atualização
        allowNull: false, // não pode ser nulo
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  },
};
