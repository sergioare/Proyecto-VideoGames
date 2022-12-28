import { Router } from 'express'
import { VIDEOGAMES } from '../paths'
import { 
    getAllVideogames, 
    getGamesBySlice,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} from '../controllers/games_controller'

const router = Router()

router.get(VIDEOGAMES, getAllVideogames)
// router.get(`${VIDEOGAMES}?name="..."`, getGamesBySlice )
router.get(`${VIDEOGAMES}/:id`, getGameById)
router.post(VIDEOGAMES, createGame)
// router.put(`${VIDEOGAMES}?name="..."`, updateGame)
// router.delete(`${VIDEOGAMES}?name="..."`, deleteGame)


export default router
