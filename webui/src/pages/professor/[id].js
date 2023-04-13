import prisma from '@/lib/db';
import { Typography, List, ListItem, Button } from '@mui/material';
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export async function getStaticPaths() {
  const professors = await prisma.professors.findMany()
  const paths = professors.map((professor) => ({
    params: { id: professor.professor_id.toString()},
  }))
  
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const professor = await prisma.professors.findUnique({
    where: { professor_id: Number(params.id) },
    include: {
      professor_courses: {
        include: {
          courses: true
        }
      }
    }
  })

  return { props: { professor } }
}

export default function professorPage({ professor }) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
      <>
      <Navbar />
        <Typography variant='h2'> Professor Info </Typography>
        <List>
            <ListItem>
              <Typography>Username: {professor.username} </Typography>
            </ListItem>
            <ListItem>
              <Typography>Name: {professor.fullName}</Typography>
            </ListItem>
            <Typography>Your classes:</Typography>
            <div key={professor.professor_courses.course_id}>
            {professor.professor_courses.map((professorCourse) => (
                <Typography>{professorCourse.courses.course_number}: {professorCourse.courses.course_name}</Typography>
            ))}
            </div>
        </List>
        <Button variant='contained' sx={{ background: "#abd699" }}  onClick={() => router.push("/lists/professors")}>Go back to Professor List</Button>
      </>
    )
  }