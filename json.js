var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '1234',
  database : 'netp'
});
 
connection.connect();
 
connection.query('SELECT * from member', function (error, results, fields) {
  if (error) throw error;
  console.log('users: ', results);
});
 
connection.end();