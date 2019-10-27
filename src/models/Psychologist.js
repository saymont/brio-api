const { Model, DataTypes, literal } = require('sequelize');

class Psychologist extends Model {
    static init(sequelize) {
        super.init({
            user_id: {
                type: DataTypes.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: literal('gen_random_uuid()'),
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
            },
            crp: {
                type: DataTypes.STRING
            },
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreingKey: 'user_id', as: 'user' })
    }

}

module.exports = Psychologist;