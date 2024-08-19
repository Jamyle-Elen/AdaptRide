import express from 'express'
import driverRoutes from './driver.routes.js'

const router = express.Router()

router.use('/', driverRoutes)

export default router;