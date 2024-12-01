import { Router } from 'express';
import {
    createFoundation,
    getFoundations,
    getFoundationById,
    updateFoundation,
    deleteFoundation,
    searchFoundationsByName
} from '../controllers/foundationController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.post('/foundations',checkAuth, createFoundation);
router.get('/foundations',checkAuth, getFoundations);
router.get('/foundations/:id',checkAuth, getFoundationById);
router.put('/foundations/:id',checkAuth, updateFoundation);
router.delete('/foundations/:id',checkAuth, deleteFoundation);
router.get('/foundations/:name',checkAuth, searchFoundationsByName)

export default router;
