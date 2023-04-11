import { PrismaClient } from "@prisma/client";
import { Button, Typography, List, ListItem } from '@mui/material';
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import AddCourse from "../../components/AddCourse";

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const students = await prisma.students.findMany()
  const paths = students.map((student) => ({
    params: { id: student.student_id.toString()},
  }))
  
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const student = await prisma.students.findUnique({
    where: { student_id: Number(params.id) },
    include: {
      Student_Course: {
        include: {
          Courses: true
        }
      }
    }
  })

  return { props: { student } }
}

export default function StudentPage({ student }) {
  const router = useRouter()

  const [courseName, setCourseName] = useState('');

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleAddCourse = async () => {
    const res = await fetch('/api/student/' + student.student_id + '/addCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseName,
      }),
    });
    if (res.status === 200) {
      setCourseName('');
      router.reload();
    } else {
      console.error(await res.text());
    }
  };

  if (router.isFallback) {
      return <div>Loading...</div>
  }

  return (
    <>
      <Navbar />
      <Typography variant='h2'> Student Info </Typography>
      <List>
          <ListItem>
            <Typography>Username: {student.username} </Typography>
          </ListItem>
          <ListItem>
            <Typography>Name: {student.fullName}</Typography>
          </ListItem>
          <ListItem>
            <Typography>Select Classes:</Typography>
            <AddCourse 
              studentId={student.student_id}
            />
            {/* <Button onClick={() => router.push(`/student/${student.student_id}/selectClasses`)}>Select Classes</Button> */}
          </ListItem>
      </List>
      <List>
      <Typography>Class List:</Typography>
            {student.Student_Course.map((studentCourse) => (
                <Typography>{studentCourse.Courses.course_name}</Typography>
            ))}
      </List>
    </>
  )
}