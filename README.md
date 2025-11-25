# 📱 Swap Class

O **Swap Class** é um aplicativo mobile desenvolvido para facilitar a compra, venda e troca de itens entre universitários, criando um ambiente seguro, prático e eficiente dentro da comunidade acadêmica.
O projeto envolve **desenvolvimento mobile com React Native + Expo** e um **backend em microsserviços Java com Spring Boot**, utilizando Docker para orquestração.

---

# 🔗 Repositórios do Projeto

### 👉 **Backend (Microsserviços em Java + Spring Boot)**

🔗 **Repositório:** [https://github.com/BentoMartins/micro-services-docker](https://github.com/BentoMartins/micro-services-docker)

Contém:
* Serviço de Autenticação
* Serviço de Produtos
* Serviço de Pedidos
* API Gateway (porta **8765**)
* Service Discovery
* Integração com banco relacional
* Docker + Docker Compose para execução completa

### 👉 **Frontend (este repositório)**

Aplicativo mobile desenvolvido em **React Native + Expo**.

---

# 📘 Visão Geral do Projeto

O Swap Class foi desenvolvido como parte de uma disciplina universitária, integrando:

* **Aplicação mobile multiplataforma** (Android/iOS/Web via Expo)
* **Arquitetura de microsserviços** Java com Spring Boot
* **API Gateway** para unificação de endpoints
* **Service Discovery** para comunicação dinâmica entre serviços
* **Banco de dados relacional**
* **Comunicação REST** entre frontend e backend
* **Containerização com Docker**

O objetivo é aprimorar a experiência de negociação dentro da comunidade acadêmica, permitindo que estudantes publiquem, encontrem e negociem itens de forma simples e confiável.

---

# 🛠️ Guia de Instalação e Execução

Abaixo está o processo para executar **backend e frontend** localmente.

---

# 🖥️ 1. Executar o Backend (Microsserviços Java)

### ✔️ **Pré-requisitos**

* **Docker** e **Docker Compose**
* **Java 17+** (apenas se quiser rodar manualmente sem Docker)

### ✔️ **Passos**

1. Clone o repositório do backend:

   ```bash
   git clone https://github.com/gportrico/swapclass-backend.git
   ```

2. Acesse o diretório raiz (onde está o `docker-compose.yml`):

   ```bash
   cd swapclass-backend
   ```

3. Suba os microsserviços:

   ```bash
   docker-compose up --build -d
   ```

4. Verifique se a API Gateway está rodando na porta **8765**.

5. Descubra o **IPv4 da sua máquina** (necessário para configurar o app):

   ```
   ipconfig
   ```

   Use o IPv4 exibido no adaptador ativo (ex.: `192.168.x.x`).

---

# 📱 2. Executar o Frontend (React Native + Expo)

### ✔️ **Pré-requisitos**

* **Node.js versão 17 ou superior**
* **npm** ou **yarn**
* **Expo CLI** (instalada automaticamente ao rodar `npx expo start`)

### ✔️ **Passos**

1. Clone o repositório do frontend:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```
3. Configure o arquivo de API (`src/services/api.js`) usando seu **IPv4 + porta 8765**:

   ```js
   const api = axios.create({
     baseURL: "http://SEU_IPV4:8765",
   });
   ```
4. Inicie o projeto:

   ```bash
   npx expo start
   ```
5. Quando o **Metro Bundler** abrir:

   * escaneie o QR Code com o **Expo Go** no smartphone, ou
   * pressione **a** para Android,
   * **i** para iOS (se tiver simulador configurado).

---

# 🧩 Tecnologias Utilizadas (Resumo)

### **Frontend**

* React Native 0.81+
* React 19
* Expo 54
* Axios
* React Navigation
* Google Fonts (Montserrat)

### **Backend**

* Java 17+
* Spring Boot (Microservices)
* Spring Cloud Gateway
* Eureka Discovery Server
* Spring Data JPA
* PostgreSQL
* Docker & Docker Compose

---

# 👥 Equipe

Projeto desenvolvido por estudantes da **Atitus Educação**:

* Gabriel Rico
* Augusto Godoy
* Bento Martins
* Henrique Gunther
* Ricardo Zanandrea
* Vitor Milani
