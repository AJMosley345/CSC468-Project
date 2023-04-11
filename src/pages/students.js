import React from 'react';
import { PrismaClient } from '@prisma/client';
import { List, ListItem, Typography } from '@mui/material'
const prisma = new PrismaClient();

export async function getStaticProps() {
  const students = await prisma.students.findMany()
  return {
    props: {
      students
    }
  }
}

export default function Students({ students }) {
  return (
    <>
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