const express = require('express');
const app = express();

app.use(express.static('css'));
app.use('/css',express.static('streaming/css'));
app.use('/css',express.static('login/css'));
app.use('/css',express.static('page/css'));
app.use(express.static('img'));

app.get('/', function(요청, 응답){
    응답.sendFile( __dirname + '/index.html');})



app.get('/upload', function(req, res){
    res.sendFile(__dirname + '/streaming/upload.html');})

    app.get('/upload2', function(req, res){
        res.sendFile(__dirname + '/streaming/upload2.html');
    })
    
    app.get('/streaming', function(req, res){
        res.sendFile(__dirname + '/streaming/streaming.html');
    })
    
    app.get('/streamingset', function(req, res){
        res.sendFile(__dirname + '/streaming/streamingset.html');
    })
    
    app.get('/streamboard', function(req, res){
        res.sendFile(__dirname + '/streaming/streamboard.html');
    })

    app.get('/login', function(req, res){
        res.sendFile(__dirname + '/login/login.html');
    })

    app.get('/signup', function(req, res){
        res.sendFile(__dirname + '/login/signup.html');
    })

    app.get('/pageindex', function(req, res){
        res.sendFile(__dirname + '/page/pageindex.html');
    })
    

//mysql 연결
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


///////////// 로그인
app.post('/login', function(req, res) {
    var id = req.body.id;
    var pw = req.body.pw;
    if (id && pw) {
        connection.query('SELECT * FROM member WHERE id = ? AND pw = ?', [id, pw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.id = id;
                res.redirect('/');
                res.end();
            } else {              
                res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/";</script>');    
            }            
        });
    } else {        
        res.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login/login.html";</script>');    
        res.end();
    }
});