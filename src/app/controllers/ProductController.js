import * as Yup from 'yup';
import Product from './../models/product.js'; // Garanta que a letra maiúscula/minúscula do arquivo esteja certa ('Product.js' ou 'product.js')

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    // 1. Validação do Yup
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    // 2. Proteção caso a imagem não seja enviada
    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'A imagem do produto é obrigatória.' });
    }

    const { name, price, category } = req.body;
    const { filename } = req.file;

    // 3. Salvando no Banco de Dados
    try {
      const newProduct = await Product.create({
        name,
        price: Number(price), // 🛠️ Garante a conversão para número
        category,
        path: filename, // 🛠️ O Sequelize gera as datas automaticamente por conta própria!
      });

      // 4. Retorno de Sucesso
      return res
        .status(201)
        .json({ message: 'Produto criado com sucesso!', product: newProduct });
    } catch (databaseError) {
      console.error('❌ ERRO NO BANCO DE DADOS:', databaseError.message);
      return res.status(500).json({
        error: 'Erro interno ao salvar o produto no banco de dados.',
        details: databaseError.message,
      });
    }
  }

  async index(_req, res) {
    const products = await Product.findAll();

    return res.status(200).json(products);
  }
}

export default new ProductController();
