const express = require('express');
const app = express();

app.use(express.json());

let courses =   [
    {id: 1, name: "java"},
    {id: 2, name: "javascript"},
    {id: 3, name: "python"}]

app.get('/courses', (req,res) =>{
    res.json(courses);
})

app.post('/courses',(req,res)=>{
    console.log(req.body);
    let singleCourse = {
        id:courses.length + 1,
        name: req.body.name
    }
    courses.push(singleCourse)
    res.send(courses);
})

app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);

    let courseToUpdate = courses.find(course => course.id === courseId);

    if (!courseToUpdate) {
        return res.status(404).send('Course not found');
    }

    courseToUpdate.name = req.body.name;

    res.json(courses);
});

app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);

    const index = courses.findIndex(course => course.id === courseId);

    if (index === -1) {
        return res.status(404).send('Course not found');
    }

    courses.splice(index, 1);

    res.json(courses);
});


app.listen(3000, ()=>{
    console.log("Server Started.");
})
