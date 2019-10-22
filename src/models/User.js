const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static IntersectionObserver(sequelize) {
        super.intit({
            user_id: {
                type: DataTypes.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: DataTypes.literal('gen_random_uuid()')
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
}

module.exports = User;