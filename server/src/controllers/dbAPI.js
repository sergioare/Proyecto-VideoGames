import axios from 'axios'
import { Videogame } from "../models/Videogameprueba"
import { Genre } from "../models/Genre"

const key = process.env.API_KEY

const getApiVideogames = async ()=>{
    try {
        const firstPage = await axios.get(`https://api.rawg.io/api/games?key=${key}`)

        // const nextPage = await axios.get(firstPage.data.next)

        // const allGames = firstPage.data.results.concat(nextPage.data.results)

        const secondPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=2`)
        const thirdPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=3`)
        const fourthPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=4`)
        const fifthPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=5`)
        
        let apiGames = firstPage.data.results.concat(
            secondPage.data.results,
            thirdPage.data.results,
            fourthPage.data.results,
            fifthPage.data.results
        )

        // const infoVideogames = await Promise.all(allGames.map(async(videogame)=>{
            let infoVideogames = apiGames.map(videogame =>{
                
                return {
                    id:videogame.id,
                    name:videogame.name,
                    released:videogame.released,
                    rating:videogame.rating,
                    platforms:videogame.platforms.map((platform)=>platform.platform.name),
                    genre:videogame.genres.map((genre)=> genre.name),
                    image: videogame.background_image
    
                }
            })
                
        return infoVideogames
    } catch (error) {
        return error.message
    }
    
}

const getDbGames = async ()=>{
    try {
        const dbIncludesGame = await  Videogame.findAll({
            include:[Genre]
            // attributes:['name']
        })
        
        // let responseGames = dbIncludesGame?.map(game=>{
        //     return{
        //     id:game.id,
        //     name: game.name,
        //     description: game.description, 
        //     released: game.released,
        //     rating: game.rating,
        //     platform : game.platform,
        //     image: game.background_image,
        //     genre:game.genres.map((genre)=> genre.name)
        //     }
        // })
    } catch (error) {
        return error.message
        
    }
     
}

export const getApiAndDBGames = async ()=>{
    const apiInfo = await getApiVideogames()
    const dbInfo= await getDbGames()
    const totalInfo = apiInfo.concat(dbInfo)
    return totalInfo
}

