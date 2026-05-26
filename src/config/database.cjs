module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '123456',
  database: 'dev-burguer-db',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
// timestamps: true, // Adiciona os campos createdAt e updatedAt automaticamente, e data de atualização do registro
// underscored: true, // Usa snake_case para os nomes dos campos no banco de dados
