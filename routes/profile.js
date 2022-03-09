import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.post('/', isLoggedIn, profilesCtrl.create)
router.get("/:id/edit", isLoggedIn, profilesCtrl.edit)
router.put("/:id", isLoggedIn, profilesCtrl.update)


export {
  router
}