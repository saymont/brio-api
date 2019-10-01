const usuario = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuario', {
        usuario_id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.INTEGER,
        },
        senha: {
            type: DataTypes.STRING
        },
        cpf: {
            type: DataTypes.STRING
        }

    });

    Usuario.associate = models => {
        Usuario.hasMany(models.PsicologoUsuario, { onDelete: 'CASCADE' });
    };

    Usuario.findByLogin = async login => {
        let usuario = await Usuario.findOne({
            where: { nome: login },
        });

        if (usuario) {
            usuario = await Usuario.findOne({
                where: { email: login }
            });
        }
        return usuario;
    };

    return Usuario;
};

export default usuario;