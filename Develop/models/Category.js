// Importing Model and DataTypes from Sequelize
const { Model, DataTypes } = require("sequelize");

// Importing the Sequelize instance configured in 'connection.js'
const sequelize = require("../config/connection.js");

// Defining a new class 'Category'
class Category extends Model {}

// Initializing the Category model with its schema
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

// Exporting the Category model for use in other parts of the application
module.exports = Category;