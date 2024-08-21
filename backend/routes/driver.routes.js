import express from 'express'
import { createDrivers, loginDriver, infoDriver } from '../controllers/driverController.js'

const router = express.Router()

router.post('/register/drivers', createDrivers)
router.post('/login/driver', loginDriver)
router.get('/info', infoDriver)

export default router
