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

    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);

    console.log(result);

    if (result.error) {

        //400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;

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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));