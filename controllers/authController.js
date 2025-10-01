import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth.js';
import { readData, saveData } from '../utils/db.js';

export const register = (req, res) => {
  const data = readData();
  const { nome, email, senha } = req.body;

  // Validation
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
  }

  // Check if email already exists
  const existingUser = data.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const hashedPassword = bcrypt.hashSync(senha, 8);

  const newUser = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    nome,
    email,
    senha: hashedPassword
  };

  data.push(newUser);
  saveData(data);
  res.status(201).json({ id: newUser.id, nome: newUser.nome, email: newUser.email });
};

export const login = (req, res) => {
  const { email, senha } = req.body;
  const data = readData();
  const user = data.find(u => u.email === email);

  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  if (!bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = generateToken(user);
  res.json({ token });
};