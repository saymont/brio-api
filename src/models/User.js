const { Model, DataTypes, literal } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            user_id: {
                type: DataTypes.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: literal('gen_random_uuid()')
            },
            administrator: {
                type: DataTypes.BOOLEAN,
            },
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING
            },
            cpf: {
                type: DataTypes.STRING
            }
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasOne(models.Psychologist, { foreingKey: 'user_id', as: 'psychologist' })
    }
}

module.exports = User;