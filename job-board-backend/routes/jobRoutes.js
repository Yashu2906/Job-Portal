const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const createJob = require('../controllers/jobController');

const jobRouter = express.Router();

jobRouter.post('/createJob',authMiddleware ,createJob);

module.exports = jobRouter