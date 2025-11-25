<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=964B00&height=120&section=header"/>

# Documentação de Requisitos — **Craft Sales**

Bem-vindo à documentação oficial de requisitos do **Craft Sales**, uma plataforma digital para **comércio eletrônico especializada em produtos artesanais**, conectando artesãos locais a compradores.
Este documento define, de forma clara, todos os **Requisitos Funcionais (RF)**, **Não Funcionais (RNF)** e **Regras de Negócio (RN)**.

---

## 🧭 Sumário

- [Visão Geral](#visão-geral)
- [Objetivos do Sistema](#objetivos-do-sistema)
- [Perfis de Usuário](#perfis-de-usuário)
- [Requisitos Funcionais](#requisitos-funcionais-rf)
- [Requisitos Não Funcionais](#requisitos-não-funcionais-rnf)
- [Regras de Negócio](#regras-de-negócio-rn)
- [Diagrama Modelos e Relacionamento](#diagrama_modelos_e_relacionamento)
- [Critérios de Aceitação](#critérios-de-aceitação)
- [Glossário](#glossário)

---

## 📖 Visão Geral

O Craft Sales é um marketplace onde clientes podem comprar produtos artesanais criados por artesãos cadastrados.
A plataforma oferece:
- Gestão de produtos e categorias
- Carrinho de compras
- Sistema de pedidos
- Integração com serviço de pagamento externo (Ex.: Efi/PagBank)
- Acompanhamento de status do pedido
- Avaliações de produtos
- Cadastro de artesãos com informações certificadas

O sistema possui três perfis principais: Administrador, Cliente e Artesão.

---

## 🎯 Objetivos do Sistema

- Oferecer um ambiente digital para vendas de artesanato
- Facilitar o cadastro de artesãos e seus produtos
- Permitir compras seguras com integração de pagamento
- Controlar estoque e acompanhar pedidos
- Permitir avaliações dos produtos após a compra
- Oferecer um painel administrativo completo

---

## 👥 Perfis de Usuário

### **1. Administrador**
- Gerencia usuários
- Gerencia categorias
- Visualiza e gerencia pedidos
- Modera avaliações

### **2. Usuário Registrado (Cliente) **
- Pode comprar produtos
- Pode avaliar produtos comprados
- Possui carrinho de compras
- Pode acompanhar status do pedido

### **3. Artesão**
- Pode cadastrar produtos
- Pode atualizar estoque
- Pode editar suas informações de artesão

---

# 🛠️ Requisitos Funcionais (RF)

## 🔐 Autenticação e Usuários

### **RF001 — Cadastro de Usuário**
- [x] O sistema deve permitir o cadastro de usuários com nome, email e senha.

### **RF002 — Login**
- [x] O sistema deve permitir autenticação via email e senha, retornando um token JWT.

### **RF003 — Recuperação de Senha**
- [x] Usuários poderão solicitar redefinição de senha via email.

### **RF004 — Gerenciar Perfil**
- [ ] Usuários registrados poderão visualizar e editar suas informações pessoais.

### **RF005 — Endereços do Usuário**
- [ ] Usuários devem possuir 1 endereço principal obrigatório, ao cadastrar-se como artesão, ou antes de relaizar compra.

### **RF006 — Perfil de Artesão**
- [ ] Usuários de tipo Artesãos devem possuir informações extras: tipo_artesanato, número da carteirinha CICAB, data_validade

---

## 🛒 Carrinho

### **RF010 — Criar Carrinho**
- [x] Cada usuário possui 1 carrinho ativo.

### **RF011 — Adicionar Item ao Carrinho**
- [ ] Adicionar produto + quantidade ao carrinho.

### **RF012 — Atualizar Quantidade**
- [ ] O usuário poderá aumentar ou diminuir quantidade de itens.

### **RF013 — Remover Item do Carrinho**
- [ ] Usuário pode remover itens a qualquer momento.

### **RF014 — Calcular Total Automatizado**
- [ ] O total do carrinho deve ser recalculado conforme: Quantidade, Preço do produto, Variação/tamanho (se houver)

📦 Pedido
### **RF020 — Criar Pedido a partir do Carrinho**
- [ ] Quando o carrinho segue para pagamento, todos os itens são transferidos para um Pedido.

### **RF021 — Status do Pedido
- [ ] Status possíveis: Pendente, Aguardando Pagamento, Pago, Em Separação, Enviado, Entregue, Cancelado.

### **RF022 — Informações do Pedido**
- [ ] Registrar: valor_total, método_pagamento, qr_code_pagamento (quando transação PIX), data_pagamento, data_envio, código_rastreamento

### **RF023 — Relacionamento com Itens**
- [ ] Cada pedido possui 1..N itens. Cada item carrega: preço_unitário, subtotal, quantidade, produto_id

## 💳 Pagamento
### **RF030 — Integração com API de Pagamento (EFI/PagBank)**
- [ ] O sistema deve gerar uma cobrança utilizando serviço externo.

### **RF031 — Atualização Automática do Status**
- [ ] Ao receber callback do pagamento:
- [ ] Atualizar status para Pago
- [ ] Liberar pedido para separação

### **RF032 — Reenvio de Cobrança**
- [ ] Usuário pode solicitar novo QR Code caso o anterior expire.

## 🛍️ Produtos e Categorias
### **RF040 — Cadastro de Produto (Artesão)**
- [ ] Produto deve possuir no minimo: as informações nome,imagem, descrição, preço, quantidade em estoque, variações (tamanho, tipo, etc.)

### **RF041 — Categorias**
- [ ] Cada produto pertence a 1 categoria.

### **RF042 — Estoque**
- [ ] O estoque deve ser atualizado após a compra.

## 🌟 Avaliações
### **RF050 — Avaliar Produto**
- [ ] Clientes podem avaliar produtos comprados.

### **RF051 — Campos da Avaliação**
- [ ] Deve haver uma maneira de avaliar um produto com no minimo, quantidade_estrela (1–5) e motivo, descricao.

### **RF052 — Moderação**
- [ ] Admin pode remover avaliações inadequadas.

---

# 🧱 Requisitos Não Funcionais (RNF)

## 🛡️ Segurança

### **RNF001**
Todas as comunicações devem ocorrer via HTTPS.

### **RNF002**
Senhas devem ser armazenadas utilizando hashing seguro (bcrypt ou Argon2).

### **RNF003**
A API deve implementar CORS, Rate Limiting e Helmet.

### **RNF004**
A autenticação deve utilizar tokens JWT com expiração.

---

## ⚡ Desempenho

### **RNF010**
O sistema deve responder em menos de 2 segundos para 95% das requisições.

### **RNF011**
Deve suportar ao menos 500 requisições simultâneas.

---

## 📱 Usabilidade

### **RNF020**
O design deve ser responsivo para desktop, tablet e mobile.

### **RNF021**
A interface deve seguir boas práticas de acessibilidade (WCAG 2.1).

---

## 🧩 Manutenibilidade

### **RNF030**
O código deve seguir padrões de sebozera code.

### **RNF031**
O backend deve ter ao menos 80% de cobertura de testes.

---

## 🧱 Confiabilidade

### **RNF040**
Falhas de rede devem ser tratadas com retentativas seguras.

---

# 🔐 Regras de Negócio (RN)

### **RN001 — Email único**
Cada usuário deve possuir um email exclusivo.

### **RN002 — Permissões**
Somente administradores podem inavivar usuario e gerenciar artesãos.

### **RN003 — Email único**
Nenhum usuário pode ter email duplicado.

### **RN004 — Estoque**
Pedido só pode ser criado se houver estoque suficiente.

### **RN005 — Carrinho Único**
Cada usuário só possui 1 carrinho ativo.

### **RN006 — Atualização de Estoque**
O estoque só é decrementado após pagamento aprovado.

### **RN007 — Status**
Pedido só avança de status seguindo a ordem definida.

### **RN008 — Avaliação**
Somente clientes que compraram podem avaliar.

### **RN009 — Pagamento**
Pagamento cancelado → pedido é automaticamente cancelado.

### **RN010 — Artesão**
Apenas artesãos podem cadastrar produtos.

---

# 📊 Diagrama Modelos e Relacionamento

<img width="1187" height="768" alt="Image" src="https://github.com/user-attachments/assets/2b11c899-5717-45d9-9593-b88fe94def43" />

# 📊 Designer Base
Estilo visual - market -Neumorphism (ou Neomorfismo)
- É um estilo que mistura formas arredondadas, botões em baixo relevo/alto relevo, quadrados com cantos suaves e um visual “macio”.
- [ ] estilo 1
<img width="927" height="581" alt="Image" src="https://github.com/user-attachments/assets/9616586c-6b47-4325-8906-9fdb85fbc7ef" />

# 🚀 Critérios de Aceitação
## CA001 — Cadastro
Email válido.
Senha com ao menos 8 caracteres.
Impedir cadastro duplicado.


## CA002 — Login
Retornar JWT válido.
Bloquear temporariamente após 5 tentativas falhas.


## CA003 — Carrinho
Total recalculado automaticamente
Impedir adicionar quantidade maior que estoque

## CA004 — Pagamento
QR Code gerado com sucesso
Status atualizado automaticamente via webhook

## CA005 — Pedido
Todos os itens do carrinho devem migrar
Estoque validado antes da confirmação



# 📝 Glossário
| Termo           | Definição                                          |
| --------------- | -------------------------------------------------- |
| **EFI**         | Serviço externo de pagamento                       |
| **CICAB**       | Carteirinha oficial de artesãos brasileiros        |
| **Webhook**     | Evento enviado da API de pagamento para o backend  |
| **JWT**         | Token de autenticação                              |
| **Marketplace** | Plataforma com vendedores (artesãos) independentes |

---



<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=964B00&height=120&section=footer"/>
