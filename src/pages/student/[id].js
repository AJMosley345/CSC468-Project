import prisma from '../../lib/db';
import { Typography, List, ListItem, Button } from '@mui/material';
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export async function getStaticPaths() {
  const students = await prisma.students.findMany()
  const paths = students.map((student) => ({
    params: { id: student.student_id.toString()},
  }));
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const student = await prisma.students.findUnique({
    where: { 
      student_id: Number(params.id)
    },
    include: {
      student_courses: {
        include: {
          courses: true
        }
      }
    }
  });
  const professor = await prisma.professors.findUnique({
    where: { professor_id: Number(params.id) },
    include: {
      professor_courses: {
        include: {
          professors: true
        }
      }
    }
  });
  return { props: { student, professor } }
}

export default function StudentPage({ student }) {
  const router = useRouter()
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
      </List>
      <List>
      <Typography>Class List:</Typography>
            {student.student_courses.map((studentCourse) => (
              <>
                <Typography>{studentCourse.courses.course_number}: {studentCourse.courses.course_name}</Typography>
              </>
            ))}
      </List>
      <Button variant='contained' sx={{ background: "#abd699" }}  onClick={() => router.push("/lists/students")}>Go back to Student List</Button>
    </>
  )
}