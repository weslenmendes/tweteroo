import express from "express";
import cors from "cors";

import { usuarios, tweets } from "./db/index.js";
import { isValidAvatar } from "./utils/index.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar)
    return res.status(400).send("Todos os campos são obrigatórios!");

  if (!isValidAvatar(avatar))
    return res.status(400).send("Esse avatar não é válido.");

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
  const { user } = req.headers;
  const { tweet } = req.body;

  if (!user || !tweet)
    return res.status(400).send("Todos os campos são obrigatórios!");

  const thisUserExists = usuarios.find((usuario) => usuario.username === user);

  if (thisUserExists) {
    const { username, avatar } = thisUserExists;
    tweets.push({ username, avatar, tweet });
    return res.status(201).send("OK");
  }

  res.status(404).send("Usuário não encontrado.");
});

app.get("/tweets", (req, res) => {
  const page = parseInt(req.query.page);

  if (page <= 0 || !page)
    return res.status(400).send("Informe uma página válida!");

  const tweetsPerPage = 10;

  const bottomLimit = (page - 1) * tweetsPerPage;
  const upperLimit = page * tweetsPerPage;

  const lastTweets = [...tweets].reverse().slice(bottomLimit, upperLimit);

  res.status(200).send(lastTweets);
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;

  const thisUserExists = usuarios.find(
    (usuario) => usuario.username === username
  );

  if (!thisUserExists) return res.status(404).send("Usuário não encontrado.");

  const allUserTweets = tweets.filter((tweet) => tweet.username === username);

  res.status(200).send(allUserTweets);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on: http://localhost:${PORT}/`);
});
