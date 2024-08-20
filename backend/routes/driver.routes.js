import express from 'express'
import { createDrivers, loginDriver, infoDriver } from '../controllers/driverController.js'

const router = express.Router()

router.post('/drivers', createDrivers)
router.post('/login', loginDriver)
router.get('/info',infoDriver)

export default router
