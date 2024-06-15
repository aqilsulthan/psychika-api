// /src/routes/histories.js

const express = require('express');
const router = express.Router();
const historiesController = require('../controllers/histories');

router.get('/', historiesController.getHistories);
router.get('/:id', historiesController.getHistoryById);
router.delete('/:id', historiesController.deleteHistoryById);

module.exports = router;
