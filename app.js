const express = require('express');
var methodOverride = require('method-override');
const app = express();

const admin = require('./routes/admin');
const contacts = require('./routes/contacts');

const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

const db = require('./models');
const Products = require('./models/Products');
const Contacts = require('./models/Contacts');
const port = 8080;

nunjucks.configure('templates', {
    autoescape: true,
    express: app
}); // app 변수 선언 바로 아래


db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('DB sync complete');
    })
    .catch(err => {
        console.error('Unable to connect to the database', err);
    });


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(methodOverride('_method'))

app.get('/', function(req, res){
    res.send('처음 만들어봐요...');
});
app.use('/admin', admin);
app.use('/contacts', contacts);


app.listen(port, function(){
    console.log('Listening on port', port);
});