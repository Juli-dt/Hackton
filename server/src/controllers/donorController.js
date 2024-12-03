import Donor from '../models/donors.js';
import { Op } from 'sequelize'

export const searchDonorsByName = async (req, res) =>{
    try {
        const { name } = req.query
        const foundations = await Donor.findAll({
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

export const searchDonorByEmail = async (req, res) =>{
    try {
        const donor = await Donor.findOne({
            where: {
                email: req.body.email
            }
        });
        if (donor) {
            return donor;
        } else {
            return {error: 'donor not found'};
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createDonor = async (req, res) => {
    try {
        const newDonor = await Donor.create(req.body);
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDonors = async (req, res) => {
    try {
        const donors = await Donor.findAll();
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDonorById = async (req, res) => {
    try {
        const donor = await Donor.findByPk(req.params.id);
        if (donor) {
            res.status(200).json(donor);
        } else {
            res.status(404).json({ error: 'Donor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDonor = async (req, res) => {
    try {
        const [updated] = await Donor.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDonor = await Donor.findByPk(req.params.id);
            res.status(200).json(updatedDonor);
        } else {
            res.status(404).json({ error: 'Donor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDonor = async (req, res) => {
    try {
        const deleted = await Donor.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Donor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
