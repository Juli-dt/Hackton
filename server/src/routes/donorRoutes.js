import { Router } from 'express';
import {
    createDonor,
    getDonors,
    getDonorById,
    updateDonor,
    deleteDonor,
    searchDonorsByName
} from '../controllers/donorController.js';
const router = Router();

router.post('/donors', createDonor);
router.get('/donors', getDonors);
router.get('/donors/:id', getDonorById);
router.put('/donors/:id', updateDonor);
router.delete('/donors/:id', deleteDonor);
router.get('/donors/:name', searchDonorsByName)

export default router;

