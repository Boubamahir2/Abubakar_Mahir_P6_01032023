import { register,login } from "./auth.js";
import {
  fetchAllSauce,
  fetchSingleSauce,
  createSauce,
  updateSauce,
  deleteSauce,
} from './sauce.js';
import likeSauce from "./like.js";
const authController = {};
const sauceController = {};

// auth controller
authController.register = register;
authController.login = login;

// sauce controller
sauceController.createSauce = createSauce;
sauceController.fetchAllSauce = fetchAllSauce;
sauceController.fetchSingleSauce = fetchSingleSauce;
sauceController.updateSauce = updateSauce;
sauceController.deleteSauce = deleteSauce;

// like sauce controller
sauceController.likeSauce = likeSauce;

export { authController, sauceController };