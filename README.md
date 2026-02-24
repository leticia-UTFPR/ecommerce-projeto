![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Driver_Nativo-brightgreen)
![Status](https://img.shields.io/badge/status-academic_project-blue)

# E-commerce Data Core (Node.js + MongoDB)

> Camada de persistência de dados para um sistema de e-commerce, desenvolvida com Node.js e driver nativo do MongoDB.

Este projeto implementa o núcleo de manipulação de dados de um e-commerce, com foco em organização modular, validação de regras de negócio e integridade referencial em ambiente NoSQL.

---

## Sobre o Projeto

Este sistema foi desenvolvido como projeto acadêmico na **UTFPR**, com o objetivo de aplicar:

* Programação Orientada a Objetos (POO) em JavaScript
* Manipulação direta de banco NoSQL
* Separação de responsabilidades
* Validação de regras de negócio antes da persistência

O projeto representa a camada de dados de um backend, sendo responsável por gerenciar as principais entidades do domínio de e-commerce.

---

## Funcionalidades

### CRUD Completo

Operações completas de:

* Clientes
* Produtos
* Pedidos
* Itens de Pedido
* Pagamentos

Cada entidade possui sua própria classe com regras de negócio encapsuladas.

---

### Validação de Dados

O sistema impede inserções ou atualizações inválidas através de métodos internos como:

* `validarCamposObrigatorios()`
* `validarCamposAtualizacao()`

As validações acontecem **antes** da comunicação com o banco.

---

### Relacionamentos NoSQL com ObjectId

Mesmo utilizando MongoDB, o projeto implementa integridade referencial lógica entre coleções utilizando `ObjectId`, garantindo consistência entre:

* Pedido → Cliente
* Pedido → Itens
* Item → Produto
* Pagamento → Pedido

---

### Sistema de Log

Erros são registrados automaticamente no arquivo:

```
log.txt
```

Utilizando o módulo nativo `fs` do Node.js para persistência de exceções.

---

### Script de Seed

O projeto inclui script para popular o banco com dados mockados para testes e validação da estrutura.

---

## Tecnologias Utilizadas

* **Node.js**
* **JavaScript (ES6+)**
* **MongoDB**
* **Driver Nativo mongodb**
* **Módulo fs (File System)**

---

## Estrutura do Projeto

```
📂 models/        → Entidades e regras de negócio
📂 db.js          → Configuração de conexão com MongoDB
📂 logger.js      → Sistema de logs
📂 dados.js       → Dados mockados
📂 inserts.js     → Script de seed
```

Arquitetura baseada em separação de responsabilidades, facilitando manutenção e evolução futura.

---

## Como Executar

### Pré-requisitos

* Node.js instalado
* MongoDB rodando localmente na porta `27017`

---

### Instalação

```bash
git clone https://github.com/leticia-UTFPR/ecommerce-projeto.git
cd ecommerce-projeto
npm install mongodb
```

---

### Executar Seed

```bash
node inserts.js
```

---

## Evoluções Futuras

Este projeto pode evoluir para:

* Implementação de API REST com Express
* Estrutura MVC completa
* Middleware global de tratamento de erros
* Uso de variáveis de ambiente (.env)
* Testes automatizados
* Docker

---

## 👨‍💻 Autores

**Carlos Eduardo Pires de Santana Hereman**<br>
**Letícia Marchioni dos Santos**<br>
**Luccas Maia Hessel**

Projeto acadêmico – UTFPR

---
