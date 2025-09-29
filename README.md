# Projeto React Native 

## Como rodar o projeto:
Clone o repositório e dentro da pasta instale todas as dependências com o seguinte comando:
```
npm install
```

Inicie o servidor de desenvolvinento do Expo:
```
npm start
```

Credenciais para teste rápido: johnd:m38rmF$

## Como Verificar usuários disponíveis para login
Para ver usuários já existentes na FakeStore API você pode consultar a seguinte URL: https://fakestoreapi.com/users

Comando cURL filtrado para printar apenas usuário e senha:
```
curl -s https://fakestoreapi.com/users | jq '.[] | {username, password}'
```


# Integrantes do Grupo
- Augusto Godoy - 1136630
- Bento Martins - 1125095
- Gabriel Rico - 1136215
- Ricardo Zanandrea - 1136748
