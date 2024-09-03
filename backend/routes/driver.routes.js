import express from 'express'
import { createDrivers, loginDriver, getDriverInfo } from '../controllers/driverController.js'

const router = express.Router()

router.post('/register/drivers', createDrivers)
router.post('/login/driver', loginDriver)
router.get('/profile/driver/:id', getDriverInfo)
// router.get('/', getDetailsMotorista)

export default router
