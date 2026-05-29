'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER, // 1, 2, 3, ...
        allowNull: false, // não pode ser nulo
        primaryKey: true, // chave primária
        autoIncrement: true, // auto-incremento
      },
      name: {
        type: Sequelize.STRING(), // 'Produto A', 'Produto B', ...
        allowNull: false, // não pode ser nulo
        unique: true, // valor único
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
    await queryInterface.dropTable('categories');
  },
};
