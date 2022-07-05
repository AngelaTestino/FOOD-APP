const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {  
      type: DataTypes.UUID,   
      defaultValue: DataTypes.UUIDV4,  
      allowNull: false,   
      primaryKey: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
      
    },
    resumen:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore:{
      type: DataTypes.INTEGER,
      validate:{
        min:1,
        max:20
      },
      allowNull:true
    },
    paso:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagen:{
      type: DataTypes.STRING,
      allowNull: true
    }


  },{timestamps: false});
};
