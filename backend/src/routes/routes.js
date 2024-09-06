import express from 'express'
import driverRoutes from './driver.routes.js'
import passengerRoutes from './passenger.routes.js'
import rideRoutes from './Ride.routes.js'

const router = express.Router()

router.use('/', driverRoutes)
router.use('/', passengerRoutes)
router.use('/', rideRoutes)

export default router;