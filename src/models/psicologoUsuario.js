
const psicologoUsuario = (sequelize, DataTypes) => {
    const PsicologoUsuario = sequelize.define('psicologo_usuario', {
        psicologo_usuario_pk: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
        },
    });

    PsicologoUsuario.associate = models => {
        PsicologoUsuario.belongsTo(models.Usuario, { ForeignKey: 'usuario_id' });
        PsicologoUsuario.belongsTo(models.Psicologo, { ForeignKey: 'psicologo_id' });
    };

    return PsicologoUsuario;
};

export default psicologoUsuario;