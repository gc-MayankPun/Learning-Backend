const express = require("express");
const cors = require("cors");
const upload = require("./utils/multer.utils");

const app = express();

const allowedOrigins = ["http://127.0.0.1:5500"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins }));

const checkOrigin = (req, res, next) => {
  const origin = req.headers.origin;
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: "Access denied: Origin not allowed",
    });
  }
  next();
};

app.post("/upload", checkOrigin, upload.single("upload-file"), (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "No file received" });

  res
    .status(201)
    .json({ success: true, message: "File uploaded successfully" });
});

app.listen(3000, () => {
  console.log("Server Listening at Port: 3000");
});
