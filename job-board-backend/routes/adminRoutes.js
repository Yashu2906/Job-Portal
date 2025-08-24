const express = require('express');
const { approveJob, rejectJob } = require('../controllers/adminController');
const adminRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const  adminMiddleware  = require('../middlewares/adminMiddleware');
const roleMiddleWare = require('../middlewares/roleMiddleware');


adminRouter.put('/jobs/:id/approve',authMiddleware, roleMiddleWare(["Admin"]) , approveJob);

adminRouter.put('/jobs/:id/reject', authMiddleware , roleMiddleWare(["Admin"]) , rejectJob)

module.exports = adminRouter;