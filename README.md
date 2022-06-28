# Crypto API 💰

> Developing ⚠️

## Descrição 
API REST que simula uma carteira de criptomoedas, permitindo cadastro de uma carteira, adição ou remoção de fundos e transferências entre carteiras.

## Tecnologias e ferramentas 🧰
- NodeJS
- Javascript
- Express
- MySQL
- Sequelize

## Como rodar a aplicação ❓
### Pré-requisitos
Para rodar a aplicação você precisará antes instalar as seguintes ferramentas:

- [NodeJS](https://nodejs.org/en/download/)
- [MySQL](https://www.mysql.com/downloads/)
- [Git](https://git-scm.com/downloads)
- [Postman](https://www.postman.com/downloads/) (uma recomendação para você testar as rotas)
- [VSCode](https://code.visualstudio.com/download) (uma recomendação para você editar o código)

### Rodando a aplicação 🖥️

```bash
# Abra seu terminal e digite o seguinte comando para clonar o repositório:
$ git clone https://github.com/adson-SO/crypto_api.git

# Acesse a pasta do projeto através do comando:
cd crypto_api

# Confirme que está na branch master do projeto através do comando:
$ git checkout master

# Instale as dependências do projeto digitando o seguinte comando no terminal:
npm install

# Abra o arquivo no VSCode através do comando:
code .

# Adicione suas varíaveis de ambiente no arquivo .env.example

# Rode as migrations da aplicação digitando o seguinte comando no terminal:
npx sequelize-cli db:migrate

# Execute a aplicação com o comando: 
npm start
```

## Testando os Endpoints 👨‍💻
Você pode testar os endpoints através do Postman.

### Cadastrar uma carteira
> POST - `http://localhost:3000/api/v1/wallet`

Exemplo de payload: 
```json
{
    "name": "Adson Sousa",
    "cpf": "12345678909",
    "birthdate": "27/03/2002",
    "email": "adson@email.com",
    "password": "123456"
}
```

Exemplo de resposta:
```json
{
    "user": {
        "address": 1,
        "name": "Adson Sousa",
        "cpf": "123.456.789-09",
        "birthdate": "27/03/2002",
        "email": "adson@email.com",
        "updatedAt": "2022-06-23T18:32:05.000Z",
        "createdAt": "2022-06-23T18:32:05.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlZHJvQGVtYWlsLmNvbSIsImlhdCI6MTY1NjAwOTEyNSwiZXhwIjoxNjU2MDk1NTI1fQ.coaYyzMcqOg91Hej-_H8n-hD5y-5q1Bgpbi1jZoDKmU"
}
```

OBS: O token recebido na resposta tem validade de 24 horas e deverá ser enviado nas headers de autorização de todas as outras requisições.

### Fazer login
> POST - `http://localhost:3000/api/v1/login`

Exemplo de payload:
```json
{
    "email": "adson@email.com",
    "password": "123456"
}
```

Exemplo de resposta:
```json
{
    "user": {
        "address": 1,
        "name": "Adson Sousa",
        "cpf": "123.456.789-09",
        "birthdate": "27/03/2002",
        "email": "adson@email.com",
        "updatedAt": "2022-06-23T18:32:05.000Z",
        "createdAt": "2022-06-23T18:32:05.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlZHJvQGVtYWlsLmNvbSIsImlhdCI6MTY1NjAwOTEyNSwiZXhwIjoxNjU2MDk1NTI1fQ.coaYyzMcqOg91Hej-_H8n-hD5y-5q1Bgpbi1jZoDKmU"
}
```

### Listar todas as carteiras
> GET - `http://localhost:3000/api/v1/wallet`

Exemplo de resposta:
```json
[
    {
        "address": 1,
        "name": "Adson Sousa",
        "cpf": "12345678909",
        "birthdate": "27/03/2002",
        "email": "adson@email.com",
        "createdAt": "2022-06-10T14:08:49.000Z",
        "updatedAt": "2022-06-10T14:08:49.000Z",
        "coins": [
            {
                "coin": "BRL",
                "fullname": "Real Brasileiro",
                "amount": 263.1209,
                "transactions": []
            }
        ]
    },
    {
        "address": 2,
        "name": "Maria Silva",
        "cpf": "40527692018",
        "birthdate": "15/06/2001",
        "email": "maria@email.com",
        "createdAt": "2022-06-03T17:16:56.000Z",
        "updatedAt": "2022-06-03T17:16:56.000Z",
        "coins": [
            {
                "coin": "BRL",
                "fullname": "Real Brasileiro",
                "amount": 34.8746,
                "transactions": []
            },
            {
                "coin": "BTC",
                "fullname": "Bitcoin",
                "amount": 2.9,
                "transactions": []
            }
        ]
    }
    {
        "address": 3,
        "name": "Jorge Santos",
        "cpf": "42088987045",
        "birthdate": "08/02/2000",
        "email": "jorge@email.com",
        "createdAt": "2022-06-17T13:29:11.000Z",
        "updatedAt": "2022-06-17T13:29:11.000Z",
        "coins": [
            {
                "coin": "BRL",
                "fullname": "Real Brasileiro",
                "amount": 5.1253,
                "transactions": [
                    {
                        "value": 5.1253,
                        "datetime": "2022-06-17T14:04:56.000Z",
                        "sendTo": 7,
                        "receiveFrom": 7,
                        "currentCotation": 5.1253
                    }
                ]
            }
        ]
    }
]
```

Este endpoint permite a busca por nome, cpf, data de nascimento, data de criação e data de atualização, através de query params.

Exemplo de busca por query params:
```bash
http://localhost:3000/api/v1/wallet?name=Adson+Sousa
```

### Buscar uma carteira pelo ID
> GET - `http://localhost:3000/api/v1/wallet/:id`

Exemplo de resposta:
```json
{
    "address": 1,
    "name": "Adson Sousa",
    "cpf": "123.456.789-09",
    "birthdate": "27/03/2002",
    "email": "adson@email.com",
    "createdAt": "2022-06-10T14:08:49.000Z",
    "updatedAt": "2022-06-10T14:08:49.000Z",
    "coins": [
        {
            "coin": "BRL",
            "fullname": "Real Brasileiro",
            "amount": 263.1209,
            "transactions": []
        }
    ]
}
```

### Adicionar fundos a uma carteira
> PUT - `http://localhost:3000/api/v1/wallet/:id`

Exemplo de payload:
```json
{
    "quoteTo": "BRL",
    "currentCoin": "USD",
    "value": 1
}
```

Exemplo de resposta:
```json
{
    "value": 5.2274,
    "datetime": "2022-06-23T17:55:45.680Z",
    "sendTo": "1",
    "receiveFrom": "1",
    "currentCotation": "5.2274"
}
```

### Deletar uma carteira
> DELETE - `http://localhost:3000/api/v1/wallet/:id`

Se a operação for bem sucedida a resposta será um status 204 com corpo vazio.

### Realizar uma transação para outra carteira
> POST - `http://localhost:3000/api/v1/wallet/:id/transaction`

Exemplo de payload:
```json
{
    "receiverAddress": 1,
    "quoteTo": "BRL",
    "currentCoin": "BTC",
    "value": 0.1
}
```

Exemplo de resposta:
```json
{
    "value": 0.1,
    "datetime": "2022-06-28T17:22:39.335Z",
    "sendTo": 1,
    "reeiveFrom": "2",
    "currentCotation": "108.835"
}
```

### Listar todas as transações de uma carteira
> GET - `http://localhost:3000/api/v1/wallet/:id/transaction`

Exemplo de resposta:
```json
[
    {
        "coin": "BTC",
        "transactions": [
            {
                "value": 0.1,
                "datetime": "2022-06-28T17:22:39.000Z",
                "sendTo": 1,
                "receiveFrom": 2,
                "currentCotation": 108.835
            }
        ]
    },
    {
        "coin": "BRL",
        "transactions": []
    }
]
```

Este endpoint também permite a busca por uma moeda específica através de query params.

Exemplo de busca por query params:
```bash
http://localhost:3000/api/v1/wallet/:id/transaction?coin=BTC
```