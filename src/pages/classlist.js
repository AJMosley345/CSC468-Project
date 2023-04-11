import React from 'react';
import { PrismaClient } from '@prisma/client';
import { List, ListItem, Typography } from '@mui/material'
import Navbar from '@/components/Navbar';
const prisma = new PrismaClient();

export async function getStaticProps() {
  const classes = await prisma.courses.findMany()
  return {
    props: {
      classes
    }
  }
}

export default function ClassList({ classes }) {
  return (
    <>
    <Navbar />
      <Typography variant='h2'> Classes </Typography>
      <List>
        {classes.map(cls => (
          <ListItem>
            <Typography> {cls.course_number}: {cls.course_name}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  )
}