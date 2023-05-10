import { register,login,logout } from "./auth.js";
const authController = {};
const sauceController = {};

authController.register = register;
authController.login = login;
authController.logout = logout;

export { authController, sauceController };