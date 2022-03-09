import { Router } from 'express'
import * as myProfilesCtrl from '../controllers/myprofiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, myProfilesCtrl.index)
router.get('/new', isLoggedIn, myProfilesCtrl.new)
router.get('/:id', isLoggedIn, myProfilesCtrl.show)
router.post('/', isLoggedIn, myProfilesCtrl.create)
router.get("/:id/edit", isLoggedIn, myProfilesCtrl.edit)
router.post('/:id/goals', isLoggedIn, myProfilesCtrl.createGoal)
router.put("/:id", isLoggedIn, myProfilesCtrl.update)


export {
  router
}