import { Router } from 'express';
import { createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    searchAdminsByName,
    searchAdminsByEmail

} from '../controllers/adminController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.post('/admins',checkAuth, createAdmin);
router.get('/admins',checkAuth, getAdmins);
router.get('/admins/:id',checkAuth, getAdminById);
router.put('/admins/:id',checkAuth, updateAdmin);
router.delete('/admins/:id',checkAuth, deleteAdmin);
router.get('/admins/:name',checkAuth, searchAdminsByName)
router.get('/admins/:email',checkAuth, searchAdminsByEmail)

export default router;
