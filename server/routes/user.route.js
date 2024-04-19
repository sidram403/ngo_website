import express from 'express';
import { getFundRequests } from '../controllers/user.controller.js';

const router = express.Router();


router.get('/getFundRequests', getFundRequests)

export default router