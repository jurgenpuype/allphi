'use strict';
import Model from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class tankkaart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
        tankkaart.belongsToMany(models.brandstofvoertuig, { through: 'tankkaartbrandstoffen' });
        tankkaart.hasOne(models.bestuurder);
    }
  }
    tankkaart.init({
        tanId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        tanKaartnummer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanGeldigheidsdatum: {
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        tanPincode: {
            type: DataTypes.STRING(10)
        },
        tanGeblokkeerd: {
            allowNull: false,
            defaultValue: 0,
            type: DataTypes.TINYINT
        }
    }, {
        sequelize,
        modelName: 'tankkaart',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'tankkaarten'
  });
  return tankkaart;
};