import express from 'express';
import { sauceController } from '../controllers/index.js';

const sauceRouter = express.Router();
// Routes
sauceRouter.route('/sauces').get(sauceController.fetchAllSauce);
sauceRouter.route('/sauces/:id').get(sauceController.fetchSingleSauce);
sauceRouter.route('/sauces').post(sauceController.createSauce);
sauceRouter.route('/sauces/:id/like').post(sauceController.likeSauce);
sauceRouter.route('/sauces/:id').patch(sauceController.updateSauce);
sauceRouter.route('/sauces/:id').delete(sauceController.deleteSauce);

export default sauceRouter;
