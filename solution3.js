const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nodejs-master:Zr7a9V1hyQxEhglc@cluster0.tltob.mongodb.net/mongo-exercises');
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({
            isPublished: true
        })
        .or([  
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
          ])
        .sort('-price') // price descending order
        .select('name auther price'); // only peek name auther
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();