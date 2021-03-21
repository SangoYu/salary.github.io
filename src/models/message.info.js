module.exports = (sequelize, DataTypes) => {
    return sequelize.define('MessageInfo', {
        Id : {
            type : DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ip : DataTypes.STRING,
        name : DataTypes.STRING,
        message : DataTypes.STRING,
        contact : DataTypes.STRING,
        time: {
            type : DataTypes.TIME,
            defaultValue : DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName : 'message'
    });
};