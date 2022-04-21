import express from "express";
import cors from "cors";

import { usuarios, tweets } from "../db/index.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  const thisUserExists = usuarios.find(
    (usuario) => usuario.username === username
  );

  if (!thisUserExists) {
    usuarios.push({ username, avatar });

    return res.status(201).send("OK");
  }

  res.status(422).send("Esse username já existe, escolha outro, por favor.");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  const thisUserExists = usuarios.find(
    (usuario) => usuario.username === username
  );

  if (thisUserExists) {
    const { avatar } = thisUserExists;
    tweets.push({ username, avatar, tweet });

    return res.status(201).send("OK");
  }

  res.status(404).send("Usuário não encontrado.");
});

app.get("/tweets", (req, res) => {
  if (tweets.length > 10) {
    const lastTweets = tweets.slice(-10);

    return res.status(200).send(lastTweets);
  }

  res.status(200).send(tweets);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on: http://localhost:${PORT}/`);
});
