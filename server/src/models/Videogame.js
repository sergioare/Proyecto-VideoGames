import { DataTypes, Model } from 'sequelize'
// import {sequelize} from '../db/db.js'
// Define the model (Videogame) to initialized in our DB "VideoGames"


class Videogame  extends Model {}

(sequelize)=>{
    
  return  Videogame.init({
        
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
   
    },
    released:{
      type: DataTypes.DATEONLY,
    },
    rating:{
      type: DataTypes.DECIMAL(10, 2),
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    
  },
  {sequelize, tableName: 'videogames'}
  )

   
}
export default Videogame