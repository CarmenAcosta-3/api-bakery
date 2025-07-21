const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.post("/", async (req, res) => {
  const { nombre, fecha, contenido, imagen } = req.body;
  const nuevoBlog = new Blog({ nombre, fecha, contenido, imagen });
  await nuevoBlog.save();
  res.status(201).json(nuevoBlog);
});

router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el blog", detalle: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, contenido, imagen } = req.body;
  const blogActualizado = await Blog.findByIdAndUpdate(
    id,
    { nombre, fecha, contenido, imagen },
    { new: true }
  );
  res.json(blogActualizado);
});

module.exports = router;
