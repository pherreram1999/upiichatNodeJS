const mysql = require('mysql');
let query = 'SELECT * FROM ??';
let parametros = ['usuarios'];
console.log(mysql.format(query,parametros));
