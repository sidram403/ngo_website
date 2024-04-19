import express from 'express';
import { setDonation, setFundRaise, setFunds, setServices } from '../controllers/form.controller.js';


const router = express.Router()

router.post('/setDonation', setDonation)
router.post('/setServices', setServices)
router.post('/setFunds', setFunds)
router.post('/setFundRaise', setFundRaise)


export default router