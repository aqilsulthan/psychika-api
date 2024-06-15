// /src/controllers/histories.js

const { History } = require('../database/models');

const getHistories = async (req, res) => {
    try {
        const histories = await History.findAll();
        res.status(200).json(histories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch histories' });
    }
};

const getHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await History.findByPk(id);
        if (history) {
            res.status(200).json(history);
        } else {
            res.status(404).json({ error: 'History not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};

const deleteHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await History.destroy({ where: { id } });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'History not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete history' });
    }
};

module.exports = {
    getHistories,
    getHistoryById,
    deleteHistoryById,
};
