import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', workoutsCtrl.index)
router.post('/', workoutsCtrl.create)



export {
  router
}