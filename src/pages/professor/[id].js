import { PrismaClient } from "@prisma/client";
import { Typography, List, ListItem } from '@mui/material';
import { useRouter } from "next/router";

const prisma = new PrismaClient();

export async function getStaticPaths() {
  const professors = await prisma.professors.findMany()
  const paths = professors.map((professor) => ({
    params: { id: professor.professor_id.toString()},
  }))
  
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const professor = await prisma.professors.findUnique({
    where: { professor_id: Number(params.id) }
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
        <Typography variant='h2'> Professor Info </Typography>
        <List>
            <ListItem>
              <Typography>Username: {professor.username} </Typography>
            </ListItem>
            <ListItem>
              <Typography>Name: {professor.fullName}</Typography>
            </ListItem>
        </List>
      </>
    )
  }