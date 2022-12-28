import axios from 'axios'
import express  from 'express'
import { Genre } from '../models/Genre'
import { Videogame } from '../models/Videogameprueba'
import {getApiAndDBGames} from './dbAPI'
const {API_KEY} = process.env

async function getAllVideogames(req, res) {
    try {
        const { name } = req.query
        const allinfo = await getApiAndDBGames()

        if (name) {
            const getByName = allinfo.filter(element => {
                element.name.toLowerCase().includes(name.toLowerCase())
            })
            getByName.length
                ? res.status(200).json(getByName.splice(0, 14))
                : res.status(404).json({ message: 'VideoGame Not Found' })
        } else {
            res.status(200).json(allinfo)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// const getGamesBySlice = async (req, res)=>{
//     try {
        
//     } catch (error) {
//         res.status(500).json({message: error.message})
        
//     }
// }
const getGameById = async (req, res)=>{
    try {
       const {id} = req.params
       if(id.includes("-")){
        const gameInDB = await Videogame.findOne({
            where: {id},
            include: [Genre]
        })
        return res.json(gameInDB)
       }
       const  gameFromAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
       res.json(gameFromAPI.data)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}
const createGame = async (req, res)=>{
    try {
        let{
            name,
            description,
            rating,
            platforms,
            genre,
            image,
            released
        }= req.body

        let newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating: rating || 3,
            platforms,
            image
        })

        let genreDB= await Genre.findAll({
            where: {name: genre}
        })

        newVideogame.addGenres(genreDB)
        res.status(200).send('Videogame was created successfully')
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}
const updateGame = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}
const deleteGame = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}
export {
    getAllVideogames,
    getGamesBySlice,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}