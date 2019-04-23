export default function(sequelize, DataTypes) {
  let Subscriber;

  return Subscriber = sequelize.define('Subscriber', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    braintreeId: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
  },{
    classMethods: {
      associate: (models) => {
        Subscriber.hasMany(models.Address);
      }
    }
  })
};
