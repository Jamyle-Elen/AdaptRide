import express from 'express'
import { createDrivers, loginDriver } from '../controllers/driverController.js'

const router = express.Router()

router.post('/drivers', createDrivers)
router.post('/login', loginDriver)
app.get('/info',infoDriver)

export default router
