import { Router } from 'express'
import * as goalsCtrl from '../controllers/goals.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', goalsCtrl.index)


export {
  router
}