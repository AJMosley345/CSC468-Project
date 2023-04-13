import React from 'react';
import prisma from '../../lib/db';
import { Box, Button, List, ListItem, Stack, Typography } from '@mui/material'
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const students = await prisma.students.findMany();
  return {
    props: {
      students
    }
  }
}

export default function Students({ students }) {
  const router = new useRouter();

  return (
    <>
    <Navbar />
      <Typography variant='h2'> Students </Typography>
      <Stack>
        {students.map(student => (
          <Box>
            <Typography> {student.username}: {student.fullName}</Typography>
            <Button 
              variant='contained' 
              sx={{ background: "#abd699" }} 
              onClick={() => router.push(`/student/${ student.student_id }`)}
            >
              Profile
            </Button>
          </Box>
        ))}
      </Stack>
    </>
  )
}