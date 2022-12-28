import { Router } from 'express'
import { GENRES } from '../paths'
import { getGenres } from '../controllers/genres_controller'
const router = Router()


router.get(GENRES, getGenres)

export default router
