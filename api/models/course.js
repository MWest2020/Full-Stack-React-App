'use strict';
// imports modules from sequelize to use the dataype validation and the models to instantialize
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title is required',
          },
        notEmpty: {
          msg: 'Please provide a value for "title"',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A description is required',
          },
          notEmpty: {
            msg: 'Please provide a value for "description".'
          },
        },    
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: {
          fieldName: "id",
          allowNull: false,
        }
      },
    },
   { 
    sequelize, 
   });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: 'userId'
  });
  };
  return Course;
};