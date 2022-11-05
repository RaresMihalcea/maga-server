module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        extra: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    return User
}