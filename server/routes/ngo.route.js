import express from 'express';
import { getDonation, getFunds, getOrganizationNames, getServices } from '../controllers/ngo.controller.js';


const router = express.Router()

router.get('/getOrganizationNames', getOrganizationNames)
router.post('/getDonation', getDonation)
router.post('/getServices', getServices)
router.post('/getFunds', getFunds)


export default router