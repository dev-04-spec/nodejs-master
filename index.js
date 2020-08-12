const express = require('express');
const app = express();
const Joi = require('joi');
const helmet = require('helmet');
const morgan=require('morgan');

const logger = require('./logger');

app.use(express.json()); //this middleware function parses incomming request in json payload
app.use(express.urlencoded({expanded:true}));// key=value&key=value 
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use(function (req, res, next) {
    console.log('Logging in...');
    next();
})

app.use(logger);
const courses = [{
        id: 1,
        name: 'Angular'
    },
    {
        id: 2,
        name: 'React JS'
    },
    {
        id: 3,
        name: 'Node JS'
    }
]

app.get('/', (req, res) => {
    res.send('Manoj Kale');
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.post('/api/courses', (req, res) => {

    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);



    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
})
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => {
        return c.id === parseInt(req.params.id)
    })
    if (!course) return res.status(404).send("The course with the given id was not found");


    res.send(course);

});

app.put('/api/courses/:id', (req, res) => {
    //Looking up the course
    // If not existing,return 404
    const course = courses.find(c => {
        return c.id === parseInt(req.params.id)
    })
    if (!course) return res.status(404).send("The course with the given id was not found");

    //validate
    //In invalid ,return 400 -Bad Request
    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //Update the course
    course.name = req.body.name;

    //Return update course
    res.send(course);
});

app.delete('/api/courses/:id', function (req, res) {
    //Look up the course
    //Not exist ,return 404 
    const course = courses.find(c => {
        return c.id === parseInt(req.params.id)
    })
    if (!course) return res.status(404).send("The course with the given id was not found");

    //Delete  
    const courseIndex = courses.indexOf(course);
    courses.splice(courseIndex, 1);

    //Return the same course
    res.send(courses);

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);

}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));