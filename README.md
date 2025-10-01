# 📦 CRUD JWT JSON

Desenvolver uma API BackEnd com **Node.js**, **Express**, **JWT** e persistência em **arquivo JSON**.  
Implementar o  **CRUD de usuários** e autenticação baseada em token.
Os teste deve ser feito utilizando **Thunder Client** nas respectivas rotas

## Use npm install no terminal da raiz do projeto

# 📌 Rotas da API

## POST /register → cadastrar novo usuário.
Dados: { nome, email, senha }
Exemplo: 
```json
{
    "nome" : "batatinha",
    "email" : "reidocapa22@example.com",
    "senha" : "123456"
}
```

## POST /login → autenticação do usuário.
Dados: { email, senha }
Gera um JWT válido por 1h.
Exemplo:
```json
{
    "email" : "reidocapa22@example.com",
    "senha" : "123456"
}
```

## GET /users → listar todos os usuários (rota protegida).
## GET /users/:id → buscar um usuário específico por id (rota protegida).
## PUT /users/:id → atualizar dados de um usuário (rota protegida).
## DELETE /users/:id → remover usuário (rota protegida).

---

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [uuid](https://www.npmjs.com/package/uuid)

---

## 📂 Estrutura do Projeto (Corrigida)
```
     ├─ db.json
     ├─ server.js
     ├─ utils/
     │     └─ db.js
     ├─ middleware/
     │     └─ auth.js
     ├─ controllers/
     │    ├─ authController.js
     │    └─ usersController.js
     └─ routes/
          ├─ auth.js
          └─ users.js
```