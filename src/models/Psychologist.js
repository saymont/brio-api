const { Model, DataTypes } = require('sequelize');

class Psychologist extends Model {
    static init(sequelize) {
        super.init({
            user_id: {
                type: DataTypes.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: DataTypes.literal('gen_random_uuid()'),
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
}

module.exports = Psychologist;