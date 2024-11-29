import { Router } from 'express';
import { createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    searchAdminsByName

} from '../controllers/adminController.js';
const router = Router();

router.post('/admins', createAdmin);
router.get('/admins', getAdmins);
router.get('/admins/:id', getAdminById);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);
router.get('/adminss/:name', searchAdminsByName)

export default router;
