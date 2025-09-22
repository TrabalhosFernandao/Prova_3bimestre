## Use npm install no terminal da raiz do projeto


# Rotas da API

## POST /register → cadastrar novo usuário.
Dados: { nome, email, senha }
Exemplo: 
{
    "nome" : "batatinha",
    "email" : "reidocapa22",
    "senha" : "123456"
}
## POST /login → autenticação do usuário.
Gera um JWT válido por 1h.
## GET /users → listar todos os usuários (rota protegida).
## GET /users/:id → buscar um usuário específico por id (rota protegida).
## PUT /users/:id → atualizar dados de um usuário (rota protegida).
## DELETE /users/:id → remover usuário (rota protegida).

---