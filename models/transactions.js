/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Date: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Ref_no: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true
    },
    Branch_Code: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Debit: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    Credit: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    Balance: {
      type: DataTypes.STRING(16),
      allowNull: true
    }
  }, {
    tableName: 'transactions'
  });
};
