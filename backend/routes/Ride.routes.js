import express from 'express'
import { createRides, getAllRides } from '../controllers/RideController.js'

const router = express.Router()

router.post('/rides', createRides)
router.get('/rides', getAllRides)

export default router
