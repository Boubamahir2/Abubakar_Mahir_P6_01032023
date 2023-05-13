import { register,login,logout } from "./auth.js";
import {
  fetchAllSauce,
  fetchSingleSauce,
  createSauce,
  updateSauce,
  deleteSauce,
  likeSauce,
} from './sauce.js';
const authController = {};
const sauceController = {};

// auth controller
authController.register = register;
authController.login = login;
authController.logout = logout;

// sauce controller
sauceController.createSauce = createSauce;
sauceController.fetchAllSauce = fetchAllSauce;
sauceController.fetchSingleSauce = fetchSingleSauce;
sauceController.updateSauce = updateSauce;
sauceController.deleteSauce = deleteSauce;
sauceController.likeSauce = likeSauce;

export { authController, sauceController };