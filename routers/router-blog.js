const express = require("express");
const router = express.Router();
const {
  crearBlog,
  obtenerBlogs,
  actualizarBlog,
  eliminarBlog,
} = require("../controllers/blogController");

router.post("/", crearBlog);
router.get("/", obtenerBlogs);
router.put("/:id", actualizarBlog);
router.delete("/:id", eliminarBlog);

module.exports = router;
