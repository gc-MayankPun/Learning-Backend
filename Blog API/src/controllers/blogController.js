const {
  getAllBlogsService,
  createBlogService,
  deleteBlogService,
} = require("../service/blogService");
const ApiError = require("../utils/apiError");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await getAllBlogsService();
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const blogData = req.body;
    const newBlog = await createBlogService(blogData);
    res
      .status(201)
      .json({ success: true, message: "Blog created", blog: newBlog });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteBlogService(id);
    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBlogs, createBlog, deleteBlog };
