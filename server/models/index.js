'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const loan = require('./loan');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.url) {
    sequelize = new Sequelize(config.url, config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// async function  dropData(){
//   await sequelize.sync({ force: true });
// }

// db.User.belongsToMany(db.User, { as: 'Lender', foreignKey: 'lender', through: db.Loan });
// db.User.belongsToMany(db.User, { as: 'User', foreignKey: 'userId', through: db.Loan });
// db.Loan.belongsTo(db.User,  {as: 'Lender', foreignKey: 'lender', onDelete: 'CASCADE'});
// db.Loan.belongsTo(db.User,  {as: 'User', foreignKey: 'userId', onDelete: 'CASCADE'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.attributes = {};
db.attributes.user = ['id', 'firstName', 'lastName', 'email', 'middleName', 'password', 'phoneNumber', 'isActive', 'createdBySelf', 'users', 'numbers', 'emails'];
db.attributes.userShort = ['id', 'firstName', 'lastName', 'numbers', 'emails'];
module.exports = db;
