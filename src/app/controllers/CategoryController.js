import * as Yup from 'yup';
import Category from '../models/category.js'; // Garanta que a letra maiúscula/minúscula do arquivo esteja certa ('Category.js' ou 'category.js')

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    // 1. Validação do Yup
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name } = req.body;

    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return res.status(400).json({ error: 'Categoria já existe.' });
    }

    // 2. Salvando no Banco de Dados
    try {
      const newCategory = await Category.create({ name });

      // 3. Retorno de Sucesso
      return res.status(201).json({
        message: 'Categoria criada com sucesso!',
        category: newCategory,
      });
    } catch (databaseError) {
      console.error('❌ ERRO NO BANCO DE DADOS:', databaseError.message);
      return res.status(500).json({
        error: 'Erro interno ao salvar a categoria no banco de dados.',
        details: databaseError.message,
      });
    }
  }

  async index(_req, res) {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  }
}

export default new CategoryController();
