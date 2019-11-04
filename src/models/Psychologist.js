const { Model, DataTypes, literal } = require('sequelize');

class Psychologist extends Model {
    static init(sequelize) {
        super.init({
            psychologist_id: {
                type: DataTypes.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: literal('gen_random_uuid()'),
            },
            crp: {
                type: DataTypes.STRING
            },
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Psychologist;