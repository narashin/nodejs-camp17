const moment = require('moment');

module.exports = function (sequelize, DataTypes){
    let Products = sequelize.define('Products', {
        id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name : { type: DataTypes.STRING },
        price : { type: DataTypes.INTEGER },
        description : { type: DataTypes.TEXT }
    });
    return Products;
}