import { Router } from 'express';
import {
    createFoundation,
    getFoundations,
    getFoundationById,
    updateFoundation,
    deleteFoundation,
    searchFoundationsByName
} from '../controllers/foundationController.js';

const router = Router();

router.post('/foundations', createFoundation);
router.get('/foundations', getFoundations);
router.get('/foundations/:id', getFoundationById);
router.put('/foundations/:id', updateFoundation);
router.delete('/foundations/:id', deleteFoundation);
router.get('/foundations/:name', searchFoundationsByName)

export default router;
