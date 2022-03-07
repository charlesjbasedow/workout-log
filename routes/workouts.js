import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', workoutsCtrl.index)
router.get('/new', isLoggedIn, workoutsCtrl.new)
router.get('/:id', isLoggedIn, workoutsCtrl.show)
router.post('/', isLoggedIn, workoutsCtrl.create)




export {
  router
}