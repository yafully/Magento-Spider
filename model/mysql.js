const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: 'spider',
    user: 'root',
    password: '123456'
});
connection.connect();

module.exports={
    query: Promise.promisify(connection.query).bind(connection),
    end: connection.end
}