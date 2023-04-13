import React from 'react';
import prisma from '@/lib/db';
import { List, ListItem, Typography, Button, Stack, Box } from '@mui/material'
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const professors = await prisma.professors.findMany();
  return {
    props: {
      professors
    }
  }
}

export default function Professors({ professors }) {
  const router = useRouter();
  
  return (
    <>
    <Navbar />
      <Typography variant='h2'> Professors </Typography>
      <Stack>
        {professors.map((professor) => (
          <Box>
            <Typography> {professor.username}: {professor.fullName}</Typography>
            <Button 
              variant='contained' 
              sx={{ background: "#abd699" }} 
              onClick={() => router.push(`/professor/${ professor.professor_id }`)}
            >
              Profile
            </Button>
          </Box>
        ))}
      </Stack>
    </>
  )
}