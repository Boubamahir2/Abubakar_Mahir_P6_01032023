import express from 'express';
import { sauceController } from '../controllers/index.js';
import muterMiddleare from '../middleware/multer-config.js';
import authenticateUser from '../middleware/auth.js';

const sauceRouter = express.Router();
// Routes

sauceRouter
  .route('/sauces')
  .get(authenticateUser, sauceController.fetchAllSauce)
  .post(authenticateUser, muterMiddleare, sauceController.createSauce);

sauceRouter
  .route('/sauces/:id')
  .get(authenticateUser, sauceController.fetchSingleSauce)
  .patch(authenticateUser, muterMiddleare, sauceController.updateSauce)
  .delete(authenticateUser, muterMiddleare, sauceController.deleteSauce);

sauceRouter.route('/sauces/:id/like').post(sauceController.likeSauce);

export default sauceRouter;
// sauceRouter
//   .route('/sauces')
//   .get(authenticateUser, sauceController.fetchAllSauce);
// sauceRouter
//   .route('/sauces/:id')
//   .get(authenticateUser, sauceController.fetchSingleSauce);
// sauceRouter
//   .route('/sauces')
//   .post(authenticateUser, muterMiddleare, sauceController.createSauce);
// sauceRouter.route('/sauces/:id/like').post(sauceController.likeSauce);
// sauceRouter
//   .route('/sauces/:id')
//   .patch(authenticateUser, muterMiddleare, sauceController.updateSauce);
// sauceRouter
//   .route('/sauces/:id')
//   .delete(authenticateUser, muterMiddleare, sauceController.deleteSauce);

// export default sauceRouter;
