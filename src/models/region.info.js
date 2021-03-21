module.exports = (sequelize, DataTypes) => {
    return sequelize.define('SalaryInfo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        personalRate: {
            field: 'personal_rate',
            type: DataTypes.TEXT,
            get (field) {
                return JSON.parse(this.getDataValue(field));
            }
        },
        companyRate: {
            field: 'company_rate',
            type: DataTypes.TEXT,
            get (field) {
                return JSON.parse(this.getDataValue(field));
            }
        },
        insuranceBase: {
            field: 'insurance_base',
            type: DataTypes.TEXT,
            get (field) {
                return JSON.parse(this.getDataValue(field));
            }
        },
        houseBase: {
            field: 'house_base',
            type: DataTypes.TEXT,
            get (field) {
                return JSON.parse(this.getDataValue(field));
            }
        },
    }, {
        timestamps: false,
        tableName: 'region'
    });
};