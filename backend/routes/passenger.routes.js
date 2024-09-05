import express from 'express'
import { createPassenger, loginPassenger } from '../controllers/passengerController.js'
import { getPassengerInfo } from '../controllers/passengerController.js'

const router = express.Router()

router.post('/register/passengers', createPassenger)
router.post('/login/passenger', loginPassenger)
router.get('/profile/passenger/:id', getPassengerInfo)


export default router;