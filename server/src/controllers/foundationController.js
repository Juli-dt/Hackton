import Foundation from '../models/foundations.js';
import { Op } from 'sequelize'

export const searchFoundationsByName = async (req, res) =>{
    try {
        const { name } = req.query
        const foundations = await Foundation.findAll({
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

export const searchFoundationByEmail = async (req, res) =>{
    try {
        const foundation = await Foundation.findOne({
            where: {
                email: req.body.email
            }
        });
        if (foundation) {
            return foundation;
        } else {
            return {error: 'foundation not found'};
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const createFoundation = async (req, res) => {
    try {
        const newFoundation = await Foundation.create(req.body);
        res.status(201).json(newFoundation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFoundations = async (req, res) => {
    try {
        const foundations = await Foundation.findAll();
        res.status(200).json(foundations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFoundationById = async (req, res) => {
    try {
        const foundation = await Foundation.findByPk(req.params.id);
        if (foundation) {
            res.status(200).json(foundation);
        } else {
            res.status(404).json({ error: 'Foundation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateFoundation = async (req, res) => {
    try {
        const [updated] = await Foundation.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedFoundation = await Foundation.findByPk(req.params.id);
            res.status(200).json(updatedFoundation);
        } else {
            res.status(404).json({ error: 'Foundation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteFoundation = async (req, res) => {
    try {
        const deleted = await Foundation.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Foundation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
