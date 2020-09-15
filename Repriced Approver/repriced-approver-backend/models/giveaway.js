module.exports = (sequelize, DataTypes) => {
  const GiveawayModel = sequelize.define('giveaway', {
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      required: true,
      values: ['inited', 'approved', 'winnerSelected', 'productShipped', 'productDelivered'],
    },
    participantsLimit: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
    costByParticipant: {
      type: DataTypes.DECIMAL(19, 4),
      required: true,
      allowNull: false,
      get() {
        const value = this.getDataValue('costByParticipant');
        return value === null ? null : parseFloat(value);
      },
    },
  }, {
    underscored: true,
  });
  return GiveawayModel;
};
