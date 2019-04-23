export default function(sequelize, DataTypes) {
  let Address;

  return Address = sequelize.define('Address', {
    address: {
      type: DataTypes.STRING
    },
    private_key: {
      type: DataTypes.STRING
    },
    passphrase: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING
    },
  },{
    classMethods: {
      associate: (models) => {
        Address.belongsTo(models.Subscriber);
      }
    }
  })
};
