import React from "react";
import { Typography } from "@mui/material";
import { Course } from "../interfaces";

const CourseList: React.FC<{ course: Course }> = ({ course }) => {
    return(
        <>
            <Typography>{course.course_number}: {course.course_name}</Typography>
        </>
    )
}

export default CourseList;