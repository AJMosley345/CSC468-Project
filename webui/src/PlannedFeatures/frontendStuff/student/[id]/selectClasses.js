import { useState, useEffect } from "react";
import { Box, Button, Checkbox, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import prisma from "../../../../lib/db";

export async function getServerSideProps( context ) {
  const { id } = context.query
  const student = await prisma.students.findUnique({
        where: { student_id: Number(id) },
        include: {
          student_courses: {
            include: {
              courses: true,
            }
          }
        }
  });
  const courses = await prisma.courses.findMany()
    return { 
        props: {
            courses,
            student
        }
  }
}

export default function SelectClasses( { courses } ) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const handleCheckboxChange = (e) => {
    const courseId = parseInt(e.target.value)
    setSelectedCourses(prevSelectedCourses => {
      if (e.target.checked) {
        return [...prevSelectedCourses, courseId]
      } else {
        return prevSelectedCourses.filter((id) => id !== courseId)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const studentId = parseInt(id);
    
    const res = await fetch(`/api/students/${studentId}/addCourse`, {
      method: "POST",
      body: JSON.stringify({ selectedCourses }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    router.push(`/student/${studentId}`);
  }

  return(
      <>
          <Navbar/>
          <Typography>Select Your Classes</Typography>
          {courses.map((course) => (
              <Box sx={{ border: 1 }} key={course.course_id}>
                  <List>
                      <Checkbox
                          id={course.course_id}
                          name={course.course_id}
                          value={course.course_id.toString()}
                          onChange={handleCheckboxChange}
                          checked={selectedCourses.includes(course.course_id)}
                          sx={{ backgroundColor: "white" }}
                      />
                      <ListItem>{course.course_number}: {course.course_name}</ListItem>
                  </List>
              </Box>
          ))}
          <Button onClick={handleSubmit}>Save Classes</Button>
      </>
  )
}