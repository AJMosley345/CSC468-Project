import React from 'react';
import prisma from '@/lib/db';
import { List, ListItem, Typography } from '@mui/material'
import Navbar from '@/components/Navbar';

export async function getStaticProps() {
  const professors = await prisma.professors.findMany();
  return {
    props: {
      professors
    }
  }
}

export default function Professors({ professors }) {
  return (
    <>
    <Navbar />
      <Typography variant='h2'> Students </Typography>
      <List>
        {professors.map(professor => (
          <ListItem>
            <Typography> {professor.username}: {professor.fullName}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  )
}