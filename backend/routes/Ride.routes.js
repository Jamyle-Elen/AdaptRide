import express from 'express'
import { createRides, getAllRides, requestRides } from '../controllers/RideController.js'

const router = express.Router()

router.post('/rides', createRides)
router.get('/rides', getAllRides)
router.post('/request-rides', requestRides)

export default router
