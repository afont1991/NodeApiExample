export default function(sequelize, DataTypes) {
  let User;

  return User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    braintree_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      type: DataTypes.STRING
    },
    // subscriber/non-subscriber
    user_type: {
      type: DataTypes.STRING,
      defaultValue: 'non-subscriber',
    },
    // Broker or others
    platform_type: {
      type: DataTypes.STRING
    },
  },{
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Address);
      }
    }
  })
};
