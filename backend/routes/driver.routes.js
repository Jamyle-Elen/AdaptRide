import express from 'express'
import { createDrivers, loginDriver } from '../controllers/driverController.js'

const router = express.Router()

router.post('/register/drivers', createDrivers)
router.post('/login/driver', loginDriver)
app.get('/info',infoDriver)

export default router
