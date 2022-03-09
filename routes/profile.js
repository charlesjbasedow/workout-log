import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.post('/', isLoggedIn, profilesCtrl.create)
router.get("/:id/edit", isLoggedIn, profilesCtrl.edit)
router.post('/:id/goals', isLoggedIn, profilesCtrl.createGoal)
router.put("/:id", isLoggedIn, profilesCtrl.update)


export {
  router
}