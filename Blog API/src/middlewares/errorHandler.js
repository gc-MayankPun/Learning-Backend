const ApiError = require("../utils/apiError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  console.log("Error:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
};

module.exports = errorHandler;
