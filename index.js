const debug = require('debug')('app:startup');
const config = require('config');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json()); //this middleware function parses incomming request in json payload
app.use(express.urlencoded({ // key=value&key=value 
    expanded: true
}));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

console.log('Application Name :'+ config.get('name'))
console.log('Mail Server :'+ config.get('mail.host'))

if (app.get('env') == 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...'); // console.log()
}
app.use(logger);


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));