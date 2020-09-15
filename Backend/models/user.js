const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      required: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      required: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      required: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    vkontakteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      required: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'approver', 'admin'],
    },
  }, {
    hooks: {
      beforeSave: async (user) => {
        const changedUser = user;
        if (user.changed('password')) {
          changedUser.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
    underscored: true,
    instanceMethods: {
    },
  });

  UserModel.prototype.toJSON = function userReturnFormatter() {
    const values = { ...this.get() };
    delete values.password;
    delete values.isApproved;
    delete values.walletId;
    delete values.createdAt;
    delete values.updatedAt;
    // delete values.photo;
    return values;
  };

  UserModel.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return user;
  };

  return UserModel;
};
