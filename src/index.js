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

  return res
    .status(422)
    .send("Esse username já existe, escolha outro, por favor.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on: http://localhost:${PORT}/`);
});
