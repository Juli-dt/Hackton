import Admin from '../models/admins.js';
import { Op } from 'sequelize'


export const searchAdminsByName = async (req, res) =>{
    try {
        const { name } = req.query
        const foundations = await Admin.findAll({
            where: {
                name: {
                    [Op.like]: `%&{name}%`
                }
            }
        })
    res.status(200).json(foundations)
} catch (error) {
    res.status(500).json({error: error.message})
}
}
export const searchAdminsByEmail = async (req, res) =>{
    try {
        const admin = await Admin.findOne({
            where: {
                email: req.body.email
            }
        });
        if (admin) {
            return admin;
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Crear un nuevo Admin
export const createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los Admins
export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un Admin por ID
export const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un Admin
export const updateAdmin = async (req, res) => {
    try {
        const [updated] = await Admin.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedAdmin = await Admin.findByPk(req.params.id);
            res.status(200).json(updatedAdmin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un Admin
export const deleteAdmin = async (req, res) => {
    try {
        const deleted = await Admin.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

