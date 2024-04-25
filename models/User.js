const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  isEmailVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {
  timestamps: false
});

User.associate = (models) => {
  User.hasMany(models.Address);
};

User.prototype.addAddress = async function(address) {
  await address.update({ userId: this.id });
};

User.prototype.removeAddresses = async function(addressIds) {
  await models.Address.destroy({ where: { id: addressIds, userId: this.id } });
};

module.exports = User;