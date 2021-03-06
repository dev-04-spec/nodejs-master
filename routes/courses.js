const express = require('express');
const router = express.Router();
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
router.get('/',(req, res, next) =>{
    res.send(courses)
})
router.post('/', (req, res) => {

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
router.get('/:id', (req, res) => {
    const course = courses.find(c => {
        return c.id === parseInt(req.params.id)
    })
    if (!course) return res.status(404).send("The course with the given id was not found");


    res.send(course);

});

router.put('/:id', (req, res) => {
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

router.delete('/:id', function (req, res) {
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

module.exports = router;