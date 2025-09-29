import bcrypt from 'bcryptjs';
import { readData, saveData } from '../utils/db.js';

export const getAllUsers = (req, res) => {
  const data = readData();
  // Remove passwords from response
  const users = data.map(({ senha, ...user }) => user);
  res.json(users);
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const user = data.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  // Remove password from response
  const { senha, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const userIndex = data.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // If user is updating password, hash it
  const updateData = { ...req.body };
  if (updateData.senha) {
    updateData.senha = bcrypt.hashSync(updateData.senha, 8);
  }

  // Check if email is being changed and if it already exists
  if (updateData.email && updateData.email !== data[userIndex].email) {
    const existingUser = data.find(u => u.email === updateData.email && u.id !== id);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
  }

  const updatedUser = { ...data[userIndex], ...updateData, id };
  data[userIndex] = updatedUser;
  saveData(data);
  
  // Remove password from response
  const { senha, ...userWithoutPassword } = updatedUser;
  res.json(userWithoutPassword);
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const userIndex = data.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const deletedUser = data.splice(userIndex, 1)[0];
  saveData(data);
  
  // Remove password from response
  const { senha, ...userWithoutPassword } = deletedUser;
  res.json(userWithoutPassword);
};