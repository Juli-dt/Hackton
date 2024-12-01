import { Router } from 'express';
import {
    createDonor,
    getDonors,
    getDonorById,
    updateDonor,
    deleteDonor,
    searchDonorsByName
} from '../controllers/donorController.js';
import { checkAuth } from '../middlewares/checkAuth.js';
const router = Router();

router.post('/donors',checkAuth, createDonor);
router.get('/donors',checkAuth, getDonors);
router.get('/donors/:id',checkAuth, getDonorById);
router.put('/donors/:id',checkAuth, updateDonor);
router.delete('/donors/:id',checkAuth, deleteDonor);
router.get('/donors/:name',checkAuth, searchDonorsByName)

export default router;

