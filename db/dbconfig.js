const mongoose = require('mongoose');

module.exports = (process) => {
    const { MONGO_DB_USER, MONGO_DB_PWD, MONGO_CONN_URL } = process;
    const option = {
        user: MONGO_DB_USER,
        pass: MONGO_DB_PWD,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    //dbName: MONGO_DB_NAME,
    mongoose.connect(MONGO_CONN_URL, option, (err) => {
        console.log(err);
    });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('connected', (conn) => {
        console.log(`connected: ${conn}`);
    });
    db.on('disconnecting', (conn) => {
        console.log(`disconnecting: ${conn}`);
    });
    db.on('error', (err) => {
        console.log(`error: ${err}`);
    });
}