/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ref_no: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    Branch_Code: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Debit: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Credit: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Balance: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'transactions'
  });
};
