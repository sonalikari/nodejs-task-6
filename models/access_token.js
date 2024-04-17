const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const User = require('./User'); 

const AccessToken = sequelize.define('AccessToken', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false }, 
  access_token: { type: DataTypes.STRING, allowNull: false, unique: true },
  expiry: { type: DataTypes.DATE, allowNull: false },
}, {
  timestamps: false 
});

AccessToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = AccessToken;
