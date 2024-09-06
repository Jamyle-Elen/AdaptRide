import express from 'express'
import { /*createRides*/ getAllRides, requestRides, acceptRide } from '../controllers/RideController.js'

const router = express.Router()

// router.post('/rides', createRides)
router.get('/rides', getAllRides)
router.post('/request-rides', requestRides)
router.post('/accept-ride', acceptRide)

export default router
