const Blog = require("../models/blog");

// Crear un nuevo blog
const crearBlog = async (req, res) => {
  const { nombre, fecha, contenido, imagen } = req.body;

  try {
    const nuevoBlog = new Blog({ nombre, fecha, contenido, imagen });
    await nuevoBlog.save();
    res.status(201).json(nuevoBlog);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el blog", detalle: error });
  }
};

// Obtener todos los blogs
const obtenerBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el blog", detalle: error });
  }
};

// Actualizar blog por ID
const actualizarBlog = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, contenido, imagen } = req.body;

  try {
    const blogActualizado = await Blog.findByIdAndUpdate(
      id,
      { nombre, fecha, contenido, imagen },
      { new: true }
    );
    res.json(blogActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el blog", detalle: error });
  }
};

// Eliminar blog por ID
const eliminarBlog = async (req, res) => {
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
};

module.exports = {
  crearBlog,
  obtenerBlogs,
  actualizarBlog,
  eliminarBlog,
};
