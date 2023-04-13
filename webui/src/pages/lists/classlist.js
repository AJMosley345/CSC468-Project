import React from 'react';
import prisma from '@/lib/db';
import { List, ListItem, Typography } from '@mui/material'
import Navbar from '@/components/Navbar';

export async function getStaticProps() {
  const courses = await prisma.courses.findMany()
  return {
    props: {
      courses
    }
  }
}

export default function ClassList({ courses }) {
  return (
    <>
    <Navbar />
      <Typography variant='h2'> Course List </Typography>
      <List>
        {courses.map((course) => (
          <ListItem>
            <Typography> {course.course_number}: {course.course_name}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  )
}