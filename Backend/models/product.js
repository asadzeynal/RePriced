module.exports = (sequelize, DataTypes) => {
  const ProductModel = sequelize.define('product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    category: {
      type: DataTypes.ENUM,
      values: ['phones', 'laptops', 'pcs'],
      required: true,
    },
    cost: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false,
      required: true,
      get() {
        const value = this.getDataValue('cost');
        return value === null ? null : parseFloat(value);
      },
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  }, {
    underscored: true,
  });
  return ProductModel;
};
