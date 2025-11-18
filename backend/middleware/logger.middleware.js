// middleware/logger.js
export const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

export const logAction = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};
