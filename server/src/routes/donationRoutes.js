import { Router } from 'express';
import { createDonation, getDonations, getDonationById, updateDonation, deleteDonation } from '../controllers/donationController.js';
import { checkAuth } from '../middlewares/checkAuth.js';
checkAuth
const router = Router();

router.post('/donations',checkAuth, createDonation);
router.get('/donations',checkAuth, getDonations);
router.get('/donations/:id',checkAuth, getDonationById);
router.put('/donations/:id',checkAuth, updateDonation);
router.delete('/donations/:id',checkAuth, deleteDonation); 
export default router;
