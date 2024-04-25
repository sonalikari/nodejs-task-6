const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const User = require('./User'); 

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false }, 
  token: { type: DataTypes.STRING, allowNull: false },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
}, {
  timestamps: false 
});

PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = PasswordResetToken;
