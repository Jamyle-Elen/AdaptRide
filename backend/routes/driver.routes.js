import express from 'express'
import { createDrivers, loginDriver, getDriverInfo } from '../controllers/driverController.js'

const router = express.Router()

router.post('/register/drivers', createDrivers)
router.post('/login/driver', loginDriver)
router.get('/dashboard/driver/:id', getDriverInfo)

export default router
