const express = require("express");
const {
  getBlogs,
  createBlog,
  deleteBlog,
} = require("../controllers/blogController");
const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
