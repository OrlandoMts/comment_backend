const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();

const port = Number(process.env.PORT);
const user = process.env.USERDB;
const pass = process.env.PASSWORDDB;

mongoose.connect(
  `mongodb+srv://${user}:${pass}@commentapp.zf6nac6.mongodb.net/`
);

const commentSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

app.use(cors());
app.use(express.json());

// GET: Obtener comentarios
app.get("/api/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(201).json({
      ok: true,
      msg: "Obteniendo resultados",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
      data: error,
    });
  }
});

// POST: Crear comentario
app.post("/api/comments", async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = new Comment({ text });
    await newComment.save();
    res.status(202).json({
      ok: true,
      msg: "Tu comentario fue envíado con exito",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Dile a Daniel que lo arregle",
      data: error,
    });
  }
});

app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));
