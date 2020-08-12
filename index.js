const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());
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

    const { error} = validateCourse(req.body);
    if (error) {

        //400 Bad Request
        return res.status(400).send(error.details[0].message);
        

    }
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
    if (!course) {
        res.status(404).send("The course with the given id was not found");

    }
    res.send(course);

});

app.put('/api/courses/:id', (req, res) => {
    //Looking up the course
    // If not existing,return 404
    const course = courses.find(c => {
        return c.id === parseInt(req.params.id)
    })
    if (!course) {
        res.status(404).send("The course with the given id was not found");

    }


    //validate
    //In invalid ,return 400 -Bad Request
    const { error} = validateCourse(req.body);
    if (error) {

        //400 Bad Request
        return res.status(400).send(error.details[0].message);
    
    }


    //Update the course

    course.name = req.body.name;

    //Return update course
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);

}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));