const {Sequelize, DataTypes} = require('sequelize')

// const sequelize = new Sequelize('postgres://your_username:your_password@localhost:5432/databaseName', {dialect: 'postgres'});
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/school_db', {
  dialect: 'postgres'
});

    sequelize.authenticate().then(() => {
        console.log(`Database connected to school_db`)
    }).catch((err) => {
        console.log(err)
    })

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
    

db.users = require('./userModel')(sequelize, DataTypes)
db.students = require('./userModel') (sequelize, DataTypes)

module.exports = db