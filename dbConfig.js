const mysql = require('mysql');


const connect = () => {
    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: 8889,
        database: 'photoprodb'
    });
    global.db = pool;

}

module.exports = connect;