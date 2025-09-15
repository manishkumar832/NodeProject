async function ErrorMiddle(err, req, res, next) {
  console.log(err);

  if (res.headersSent) {
    // If response is already sent, let Express handle it
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    error: err.errors || null,
  });
}

module.exports = { ErrorMiddle };
