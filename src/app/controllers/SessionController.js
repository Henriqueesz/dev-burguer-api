import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authConfig from './../../config/auth.js';

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
    const isValid = await schema.isValid(req.body, { strict: true });

    const emailOrPasswordIncorrectMessage = () => {
      return res.status(400).json({ error: 'Email or password incorrect' });
    };

    if (!isValid) {
      emailOrPasswordIncorrectMessage();
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      emailOrPasswordIncorrectMessage();
    }

    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      existingUser.password_hash,
    );

    if (!isPasswordCorrect) {
      emailOrPasswordIncorrectMessage();
    }

    const token = jwt.sign({ id: existingUser.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
      token,
    });
  }
}

export default new SessionController();
