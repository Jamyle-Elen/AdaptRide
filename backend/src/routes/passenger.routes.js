import express from 'express'
import { createPassenger, loginPassenger, getPassengerInfo } from '../controllers/passengerController.js'
// import { getPassengerInfo } from '../../backend/controllers/passengerController.js'

const router = express.Router()

router.post('/register/passengers', createPassenger)
router.post('/login/passenger', loginPassenger)
router.get('/profile/passenger/:id', getPassengerInfo)


export default router;