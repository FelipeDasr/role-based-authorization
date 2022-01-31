# Autorização baseada em papeis 
## Role based authorization

<div align="center"></br>
  <img alt="Typescript badge" src="https://img.shields.io/badge/Typescript-00B1EA?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="NodeJS badge" src="https://img.shields.io/badge/Node.js-90C53F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="API badge" src="https://img.shields.io/badge/API%20REST-E64D80?style=for-the-badge" />
  <img alt="ExpressJS badge" src="https://img.shields.io/badge/Express.js-333331?style=for-the-badge" />
  <img alt="TypeORM badge" src="https://img.shields.io/badge/TYPEORM-FFAB00?style=for-the-badge" />
</div></br>

Demonstração de um sistema que tem o acesso baseado em papeis. Nesta API existem 3 Três tipos de flags: **`admin`**, **`moderator`** e **`member`**, sendo que nesse modelo, a aplicação não faz a distinção de superioridade, como por exemplo: **admin** > **moderator**, mas sim se o usuário tem a flag necessária para ter acesso, ou seja, mesmo o administrador, só consegue acesso caso o papel **`admin`** esteja habilitada em uma determinada rota, servindo essa regra para todas as outras flags.

A verificação de acesso se resume em um **Middleware** **`havePermission()`**, que é especificado antes de cada rota que exige autenticação, e é passado como parâmetro um `array` com os papeis que poderão ter acesso.

**Exemplo**

```typescript
router.get('/admin', havePermission(['admin']), applicationControllers.doSomething);
```

Esse **middleware** pega o JWT Token passado, e verifica no banco de dados a flag do usuário.

---

**Autenticação**
  - [**Criar conta**](#signup)
  - [**Pegar token de acesso**](#signin)

**Testando**
  - [**Acessando rotas**](#testando)

---

# Iniciando

``> npm start``

Caso tudo acorra de acordo, a saída do terminal deverá ser como:

!['SUCCESS'](./readme_assets/success.PNG)

# SignUp

| Rota          | Método     |
|---------------|------------|
| **`/signup`** | **`POST`** |


**Parâmetros obrigatórios**

| Campo          | Tipo         | Local | Descrição                                           |
|----------------|--------------|-------|-----------------------------------------------------|
| **`nickname`** | **`string`** | Body  | Nome do usuário                                     |
| **`password`** | **`string`** | Body  | Senha                                               |
| **`email`**    | **`string`** | Body  | E-mail                                               |
| **`role`**     | **`string`** | Body  | Papel: **`admin`**, **`moderator`** ou **`member`** |

**Exemplo de requisição**

```json
{
  "nickname": "FirstAdmin",
  "email": "first.admin@email.com",
  "password": "first-admin#_",
  "role": "admin"
}
```

**Resposta de sucesso**

**Código**: **`201 CREATED`**

```json
{
  "nickname": "FirstAdmin",
  "email": "first.admin@email.com",
  "role": "admin",
  "id": "8ebea2c0-aac9-46bf-b3bd-72829fa93a54"
}
```

# SignIn

| Rota          | Método     |
|---------------|------------|
| **`/signin`** | **`POST`** |

**Parâmetros obrigatórios**

| Campo          | Tipo         | Local | Descrição                                           |
|-|-|-|-|
|**`email`**|**`string`**|Body|E-mail da conta|
|**`password`**|**`string`**|Body|Senha de usuário|

**Exemplo de requisição**

```json
{
  "email": "first.admin@email.com",
  "password": "first-admin#_"
}
```

**Resposta de sucesso**

**Código**: **`200 OK`**

```json
{
  "user": {
    "id": "8ebea2c0-aac9-46bf-b3bd-72829fa93a54",
    "nickname": "FirstAdmin",
    "email": "first.admin@email.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlYmVhMmMwLWFhYzktNDZiZi1iM2JkLTcyODI5ZmE5M2E1NCIsImlhdCI6MTY0MzU4OTA3NSwiZXhwIjoxNjQzNjc1NDc1fQ.HrvoNE1V3WqoWr-kNPgfy8Wibv3380CeYXPEhK-NZDM"
}
```

O JWT token retornado tem a validade de 24 horas, e deve ser enviado dentro do cabeçalho **`authorization`**, como um **`Bearer token`** em todas as requisições, exemplo:

    header.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlYmVhMmMwLWFhYzktNDZiZi1iM2JkLTcyODI5ZmE5M2E1NCIsImlhdCI6MTY0MzU4OTA3NSwiZXhwIjoxNjQzNjc1NDc1fQ.HrvoNE1V3WqoWr-kNPgfy8Wibv3380CeYXPEhK-NZDM"

# Rotas para acesso

As rotas estão definidas com esses paths e com estas permissões:

```typescript
router.post('/signup', authControllers.signUp);
router.post('/signin', authControllers.signIn);

router.get('/admin', havePermission(['admin']), applicationControllers.doSomething);
router.get('/moderator', havePermission(['moderator']), applicationControllers.doSomething);
router.get('/member', havePermission(['member']), applicationControllers.doSomething);

router.get('/staff', havePermission(['admin', 'moderator']), applicationControllers.doSomething);;
router.get('/all_users', havePermission(['admin', 'moderator', 'member']), applicationControllers.doSomething);
```

# Testando

Caso o usuário tenhas acesso em uma determinada rota, será retornado um json informando o acesso garantido, caso contrário, um acesso negado.

**Exemplo**

Administrador tentando acesso a rota **`staff`**:

**Código**: **`200 OK`**

```json
{
   "success": "Access granted"
}
```

Administrador tentando acesso a rota **`member`**:

**Código**: **`401 UNAUTHORIZED`**

```json
{
  "errors": [
    "unauthorized"
  ]
}
```

---
<br/>

### 🤖 Tecnologias
 - **Typescript**
 - **Node.JS**
 - **Express**
 - **MySQL**
 - **TypeORM**
 - **JWT (JsonWebToken)**