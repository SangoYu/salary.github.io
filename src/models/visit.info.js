module.exports = (sequelize, DataTypes) => {
    return sequelize.define('VisitInfo', {
        Id : {
            type : DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ip : DataTypes.STRING,
        page : DataTypes.STRING,
        visits : DataTypes.INTEGER,
        time: {
            type : DataTypes.TIME,
            defaultValue : DataTypes.NOW
        },
        updatedAt: {
            type : DataTypes.TIME,
            defaultValue : DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName : 'visit'
    });
};