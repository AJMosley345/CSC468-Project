import React from 'react';
import prisma from '../../lib/db';
import { List, ListItem, Typography } from '@mui/material'
import Navbar from '../../components/Navbar';

export async function getStaticProps() {
  const students = await prisma.students.findMany();
  return {
    props: {
      students
    }
  }
}

export default function Students({ students }) {
  return (
    <>
    <Navbar />
      <Typography variant='h2'> Students </Typography>
      <List>
        {students.map(student => (
          <ListItem>
            <Typography> {student.username}: {student.fullName}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  )
}