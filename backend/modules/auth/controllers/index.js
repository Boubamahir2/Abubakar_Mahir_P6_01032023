import login from './login.js';
import register from './register.js';
import logout from './logout.js';

const authController = {};

authController.login = login;
authController.register = register;
authController.logout = logout;

export default authController;
