module.exports = (sequelize, DataTypes) => {
    return sequelize.define('SalaryInfo', {
        id : {
            type : DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ip : DataTypes.STRING,
        city : DataTypes.STRING,
        salary : DataTypes.INTEGER,
        aftertax : DataTypes.INTEGER,
        insurancebase : DataTypes.INTEGER,
        housebase : DataTypes.INTEGER,
        time: {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName : 'salary'
    });
};