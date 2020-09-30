'use strict';
const {
  Model
} = require('sequelize');

const {encrypt} = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: {
            msg: "Nama harus diisi"
          }
      }
    }, 
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Email harus diisi/Format email salah"
        }
      }
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks:{
      beforeCreate:(instance, options) => {
        instance.password = encrypt(instance.password)
      }
    },
    modelName: 'User',
  });
  return User;
};