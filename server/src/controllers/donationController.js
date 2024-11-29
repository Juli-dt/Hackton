import Donation from '../models/donations.js';

export const createDonation = async (req, res) => {
    try {
        const newDonation = await Donation.create(req.body);
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id);
        if (donation) {
            res.status(200).json(donation);
        } else {
            res.status(404).json({ error: 'Donation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDonation = async (req, res) => {
    try {
        const [updated] = await Donation.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDonation = await Donation.findByPk(req.params.id);
            res.status(200).json(updatedDonation);
        } else {
            res.status(404).json({ error: 'Donation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDonation = async (req, res) => {
    try {
        const deleted = await Donation.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Donation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
