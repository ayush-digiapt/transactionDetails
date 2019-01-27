/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tags', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'tags'
  });
};
