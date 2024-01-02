// Import Model and DataTypes from the sequelize ORM package
const { Model, DataTypes } = require('sequelize');

// Import the configured sequelize instance for database connection
const sequelize = require('../config/connection.js');

// Define a class 'Tag', extending Sequelize's Model class
class Tag extends Model {}

// Initialize the Tag model with its schema and configuration
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
// Export the Tag model
module.exports = Tag;