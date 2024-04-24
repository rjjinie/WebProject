const configSystem = require("../../config/system") 

const bookRouter = require('./book.route');
const authRouter = require('./auth.route');
const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
  const ADMIN_PATH = '/' + configSystem.adminPrefix;

  app.use(
    ADMIN_PATH + "/books",
    authMiddleware.authRequire,
    bookRouter
  );

  app.use(
    ADMIN_PATH + "/auth", 
    authRouter
  );
}