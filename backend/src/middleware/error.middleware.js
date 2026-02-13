const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};
