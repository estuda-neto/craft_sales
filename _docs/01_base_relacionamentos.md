<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=4040FF&height=120&section=header"/>

# 📘 Documentação de Requisitos — craft_sales

## 🧭 Sumário

- [📖 Visão Geral](#-visão-geral)
- [🎯 Objetivos do Sistema](#-objetivos-do-sistema)
- [👥 Perfis de Usuário](#-perfis-de-usuário)
- [🛠️ Requisitos Funcionais](#️-requisitos-funcionais)
- [🧱 Requisitos Não Funcionais](#-requisitos-não-funcionais)
- [🔐 Regras de Negócio](#-regras-de-negócio)
- [🚀 Critérios de Aceitação](#-critérios-de-aceitação)
- [📝 Glossário](#-glossário)

---

## 📖 Visão Geral

A **Plataforma craft_sales** é um sistema de **comércio eletrônico de artesanato**, permitindo que artesãos cadastrem seus produtos e consumidores realizem compras de forma simples, rápida e segura.

O sistema inclui catálogo, carrinho de compras, pedidos, rastreamento, avaliações e painel administrativo.

---

## 🎯 Objetivos do Sistema

- Facilitar a venda e compra de produtos artesanais.
- Permitir que artesãos gerenciem seu catálogo e pedidos.
- Proporcionar uma experiência de compra prática e intuitiva para o cliente.
- Garantir segurança nas operações e nos dados dos usuários.
- Automatizar processos como carrinho, pedidos e controle de estoque.

---

## 👥 Perfis de Usuário

### **Cliente**
Pode visualizar produtos, adicionar itens ao carrinho, realizar pedidos e avaliar compras.

### **Artesão**
Cadastra produtos, acompanha vendas, gerencia estoque e responde avaliações (opcional).

### **Administrador**
Gerencia categorias, produtos, usuários e atua na resolução de problemas e moderação.


## 🛠️ Requisitos Funcionais

# 🔐 Usuário

### **RF001 — Cadastro de Usuário**
O sistema deve permitir cadastro com nome, email, senha, foto, telefone e bio.

### **RF002 — Autenticação**
Login via email e senha, retornando token JWT.

### **RF003 — Recuperação de Senha**
Redefinição de senha via email.

### **RF004 — Gerenciar Endereços**
Usuário pode cadastrar, editar e remover múltiplos endereços.


# 🛒 Carrinho

### **RF005 — Carrinho Automático**
Um carrinho deve ser gerado automaticamente ao criar uma conta.

### **RF006 — Adicionar Item**
Permitir adicionar produtos ao carrinho com quantidade, tamanho e variação.

### **RF007 — Atualizar Item**
Usuário pode alterar quantidade ou remover itens.

### **RF008 — Calcular Total**
O sistema deve recalcular total automaticamente sempre que houver alterações.

# 📦 Pedido

### **RF009 — Criar Pedido**
Ao confirmar o carrinho, um pedido deve ser criado.

### **RF010 — Status do Pedido**
Status disponíveis:
- aguardando_pagamento  
- pago  
- enviado  
- concluído  
- cancelado  

### **RF011 — Código de Rastreamento**
Permitir adicionar código de rastreamento ao pedido.

### **RF012 — Forma de Pagamento**
Registrar o método escolhido pelo usuário.


# 🎁 Produtos e Categorias

### **RF013 — Cadastro de Produtos (Admin/Artesão)**
Cadastro de produtos contendo nome, preço, descrição, imagens, estoque e categoria.

### **RF014 — Cadastro de Categorias (Admin)**
Categorias devem ter tag e descrição.

### **RF015 — Exibir Produtos**
Listar produtos com filtros por nome, preço e categoria.


# ⭐ Avaliações

### **RF016 — Avaliar Produtos**
Clientes podem avaliar produtos adquiridos com:
- quantidade de estrelas  
- título (motivo resumido)  
- descrição  


## 🧱 Requisitos Não Funcionais

- **RNF001** — HTTPS obrigatório.  
- **RNF002** — Senhas devem utilizar hash seguro (bcrypt).  
- **RNF003** — Segurança com Helmet, Rate Limit e CORS.  
- **RNF004** — Resposta < 2s para 95% das requisições.  
- **RNF005** — Suporte para 500 conexões simultâneas.  

---

## 🔐 Regras de Negócio

- **RN001** — Email deve ser único.  
- **RN002** — Apenas admins acessam ações restritas.  
- **RN003** — Cliente pode aceitar múltiplas propostas (caso use módulo freelancer).  


## 🚀 Critérios de Aceitação

### **CA001 — Cadastro**
- Valida email.  
- Exige senha forte.  
- Envia email de confirmação.  

### **CA002 — Login**
- Gera token JWT.  
- Bloqueia conta após 5 tentativas.  

---

## 📝 Glossário

| Termo | Definição |
|-------|-----------|
| **API** | Interface para comunicação entre sistemas |
| **JWT** | Token assinado para autenticação |
| **CSP** | Política de Segurança de Conteúdo |

---

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=4040FF&height=120&section=footer"/>
