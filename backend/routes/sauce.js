import { Router } from 'express';
const router = Router();

import auth from '../middlewares/auth';
import multer from '../middlewares/multer-config';

import { readAllSauces, readOneSauce, createSauce, likeSauce, updateSauce, deleteSauce } from '../controllers/sauce';

router.get('/sauces', auth, readAllSauces);
router.get('/sauces/:id', auth, readOneSauce);
router.post('/sauces', auth, multer, createSauce);
router.post('/sauces/:id/like', auth, likeSauce);
router.put('/sauces/:id', auth, multer, updateSauce);
router.delete('/sauces/:id', auth, deleteSauce);

export default router;