const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require("dotenv")
const db = mysql.createConnection({
    host: "172.20.0.11",
    port: '3306',
    user: "remote",
    password: "test123",
    database: "project",
});

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('This worked')
});

// Routes to get all the information from each table
app.get('/getstudents', (req, res) => {
    const SelectStudents = " SELECT * FROM Students";
    db.query(SelectStudents, (err, result) => {
        res.send(result)
    })
});
app.get('/getprofessors', (req, res) => {
    const SelectProfessors = " SELECT * FROM Professors";
    db.query(SelectProfessors, (err, result) => {
        res.send(result)
    })
});
app.get('/getcourses', (req, res) => {
    const SelectCourses = " SELECT * FROM Courses";
    db.query(SelectCourses, (err, result) => {
        res.send(result)
    })
});

// Routes to insert data into the tables
app.post("/insertstudents", (req, res) => {
    const username = req.body.setUsername;
    const fullName = req.body.setFullName;
    const InsertStudent = "INSERT INTO Students (username, full_name) VALUES (?, ?)";
    db.query(InsertStudent, [username, fullName], (err, result) => {
        console.log(result)
    })
})
app.post("/insertprofessors", (req, res) => {
    const username = req.body.setUsername;
    const fullName = req.body.setFullName;
    const InsertProfessor = "INSERT INTO Professors (username, full_name) VALUES (?, ?)";
    db.query(InsertProfessor, [username, fullName], (err, result) => {
        console.log(result)
    })
})
app.post("/insertcourses", (req, res) => {
    const courseNumber = req.body.setCourseNumber;
    const courseName = req.body.setCourseName;
    const InsertCourse = "INSERT INTO Courses (course_number, course_name) VALUES (?, ?)";
    db.query(InsertCourse, [courseNumber, courseName], (err, result) => {
        console.log(result)
    })
})

// Routes to delete a record from each table
app.delete("/delete/:studentId", (req, res) => {
    const studentId = req.params.studentId;
    const DeleteStudent = "DELETE FROM Students WHERE id = ?";
    db.query(DeleteStudent, studentId, (err, result) => {
        if (err) console.log(err);
    })
})
app.delete("/delete/:professorId", (req, res) => {
    const professorId = req.params.professorId;
    const DeleteProfessor = "DELETE FROM Professors WHERE id = ?";
    db.query(DeleteProfessor, professorId, (err, result) => {
        if (err) console.log(err);
    })
})
app.delete("/delete/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    const DeleteCourse = "DELETE FROM Courses WHERE id = ?";
    db.query(DeleteCourse, courseId, (err, result) => {
        if (err) console.log(err);
    })
})

// Routes to update a record

app.listen('3001', "localhost", () => { 

});
