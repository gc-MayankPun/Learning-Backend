const Blog = require("../models/blogModel");
const mongoose = require("mongoose");
const ApiError = require("../utils/apiError");

const getAllBlogsService = async () => {
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      throw new ApiError("No blog data", 400);
    }

    return blogs;
  } catch (error) {
    throw new ApiError(error.message || "Fetching blogs failed", 400);
  }
};

const createBlogService = async (blogData) => {
  try {
    if (!blogData || Object.keys(blogData).length === 0) {
      throw new ApiError("No blog data provided", 400);
    }

    const blog = new Blog(blogData);
    await blog.save();

    return blog;
  } catch (error) {
    throw new ApiError(error.message || "Blog creation failed", 400);
  }
};

const deleteBlogService = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("Id format is invalid", 400);
    }

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      throw new ApiError("Blog not found", 400);
    }

    return blog;
  } catch (error) {
    throw new ApiError(error.message || "Blog deletion failed", 400);
  }
};

module.exports = {
  getAllBlogsService,
  createBlogService,
  deleteBlogService,
};
