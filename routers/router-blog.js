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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blogEliminado = await Blog.findByIdAndDelete(id);

    if (!blogEliminado) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    res.json({ message: "Blog eliminado correctamente", blog: blogEliminado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el blog", detalle: error });
  }
});

module.exports = router;
