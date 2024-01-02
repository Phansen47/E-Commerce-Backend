// Importing Model and DataTypes from Sequelize
const { Model, DataTypes } = require('sequelize');

// Importing the Sequelize connection from 'connection.js'
const sequelize = require('../config/connection.js');

// Defining a new class 'Tag' extending the Sequelize Model
class Tag extends Model {}

// Initializing the Tag model with its schema
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: { 
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// Exporting the Tag model
module.exports = Tag;