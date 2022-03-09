import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, workoutsCtrl.index)
router.get('/new', isLoggedIn, workoutsCtrl.new)
router.get('/:id', isLoggedIn, workoutsCtrl.show)
router.get("/:id/edit", isLoggedIn, workoutsCtrl.edit)
router.post('/', isLoggedIn, workoutsCtrl.create)
router.post('/:id/caffeine', isLoggedIn, workoutsCtrl.createCaff)
router.put("/:id", isLoggedIn, workoutsCtrl.update)
router.delete("/:id", isLoggedIn, workoutsCtrl.delete)




export {
  router
}