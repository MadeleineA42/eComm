// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER, //sets the datatype to an integer
      allowNull: false, //disallows null values
      primaryKey: true, //sets this as the primary key
      autoIncrement: true, 
    },
    product_name: {
      type: DataTypes.STRING, //sets the datatype to a string
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), //sets the datatype to a decimal value allowing decimal places
      allowNull: false,
      validate: { //validation that the value is a decimal
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, //sets the default value to 10
      validate: { //validates the value as a number
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { //will refer to the "category table"
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
