// Load environment variables from a .env file
require('dotenv').config();

// Import the Sequelize library for database interactions
const Sequelize = require('sequelize');

// Create a Sequelize instance for connecting to the database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

    // Export the Sequelize instance
module.exports = sequelize;