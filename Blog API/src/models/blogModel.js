const { Schema, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
    },
    content: {
      type: String,
      required: true,
      minLength: 20,
    },
    category: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel = model("blog", BlogSchema);
module.exports = BlogModel;
