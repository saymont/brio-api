const psicologo = (sequelize, DataTypes) => {
    const Psicologo = sequelize.define('psicologo', {
        upsicologo_id: {
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
        },
        crp: {
            type: DataTypes.STRING
        }

    });

    Psicologo.associate = models => {
        Psicologo.hasMany(models.PsicologoUsuario, { onDelete: 'CASCADE' });
    };

    Psicologo.findByLogin = async login => {
        let psicologo = await Psicologo.findOne({
            where: { nome: login },
        });

        if (psicologo) {
            psicologo = await Psicologo.findOne({
                where: { email: login }
            });
        }
        return psicologo;
    };

    return Psicologo;
};

export default psicologo;