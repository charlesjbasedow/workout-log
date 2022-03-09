import { Router } from 'express'
import * as goalsCtrl from '../controllers/goals.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, goalsCtrl.index)
router.post('/', isLoggedIn, goalsCtrl.create)
router.get("/:id/edit", isLoggedIn, goalsCtrl.edit)
router.put("/:id", isLoggedIn, goalsCtrl.update)


export {
  router
}