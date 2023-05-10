import express from 'express';
import authController from '../controllers/index.js';

const authRouter = express.Router();

// Routes
authRouter.route('/signup').post(authController.register);
authRouter.route('/login').post(authController.login);
authRouter.route('/logout').get(authController.logout);

export default authRouter;