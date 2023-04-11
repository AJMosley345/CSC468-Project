import { useState, useEffect } from "react";
import axios from 'axios';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

export default function AddCourse ({ studentId }) {
    const [courseId, setCourseId] = useState('');
    const [classes, setClasses] = useState([]);

    const handleCourseIdChange = (event) => {
      setCourseId(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post(`/api/students/${studentId}/addCourse`, 
            {
                student_id: studentId,
                course_id: Number(courseId),
            },
            {
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        const fetchAllCourses = async () => {
            const res = await fetch("/api/courses/getcourses");
            const data = await res.json();
            setClasses(data);
        }
        fetchAllCourses();
    }, []);

    return(
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <InputLabel>Classes</InputLabel>
                <Select
                    label="Course Name"
                    value={courseId}
                    onChange={handleCourseIdChange}
                >
                    {classes.map(cls => (
                        <MenuItem key={cls.course_id} value={cls.course_id}>{cls.course_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit">Add Course</Button>
        </form>
    )
}