# Tweteroo

Um projeto back-end onde a aplicação consiste na construção de uma API para um clone do Twitter.

## Requisitos

- [ x ] Deve utilizar a porta 5000 como padrão;
- [ x ] Deve armazenar os dados em váriaveis globais na memória;
- [ x ] Deve receber os parâmetros **username** e **avatar** pelo body da requisição na rota **/sign-up** pelo método HTTP POST, salvar na memória e retorna uma mensagem com o conteúdo "OK";
- [ x ] Deve receber os parâmetros **username** e **tweet** pelo body da requisição na rota **/tweets** pelo método HTTP POST, salvar na memória e retorna uma mensagem com o conteúdo "OK";
- [ x ] Deve retornar os últimos 10 tweets da aplicação na rota **/tweets** pelo método HTTP GET.

## Rotas

```
POST /sign-up          -> Permite o cadastro de usuários
POST /tweets           -> Permite um usuário cadastrado postar seus tweets
GET  /tweets           -> Retorna os últimos 10 tweets
GET  /tweets/:username -> Retorna todos os tweets de um usuário especifico
```

## Tecnologias usadas

- NodeJS
- ExpressJS
- CORS

## Como executar

Passo 1: Inicialmente precisamos fazer o clone do repositório na máquina local, para isso executamos os comandos abaixo em um terminal:

```bash
$ git clone https://github.com/weslenmendes/tweteroo.git
```

Passo 2: Após finalizar o processo de clone do repositório, precisamos entrar na pasta criada e instalar os dependências do projeto:

```bash
$ cd tweteroo && npm install
```

Passo 3: Após o término da instalação das dependências, podemos executar o script para colocar o nosso server no ar:

```bash
$ npm run dev
```

Com a finalização de todos os passos anteriores, o nosso server deve estar sendo executado na porta 5000 da nossa máquina local.

---

<p align="center">Feito com 💜 por <a href="https://github.com/weslenmendes">Weslen Mendes</a></p>
