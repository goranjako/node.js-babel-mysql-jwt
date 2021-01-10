'use strict';
const bcrypt = require('bcrypt-nodejs');
const {
  Model
} = require('sequelize');
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
    fullName: {
      type:  DataTypes.STRING,
      allowNull: false
    
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
     
    },
    password: {
      type:  DataTypes.STRING,
      allowNull: false
      
    },
  },
  
  {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  return User;
};