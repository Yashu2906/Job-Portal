const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {createJob,getJob} = require('../controllers/jobController');

const jobRouter = express.Router();

jobRouter.post('/createJob',authMiddleware ,createJob);
jobRouter.post('/',getJob);

module.exports = jobRouter