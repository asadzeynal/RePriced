module.exports = (sequelize, DataTypes) => {
  const GiveawayElasticExportModel = sequelize.define('giveawayElasticExport', {
    operation: {
      type: DataTypes.ENUM,
      allowNull: false,
      required: true,
      values: ['insert', 'update', 'delete'],
    },
  }, {
    underscored: true,
  });
  return GiveawayElasticExportModel;
};
