import React from 'react';
import { List, ListItem, Typography } from '@mui/material'
import Navbar from '../components/Navbar';

export default function Home({ classes }) {
  return (
    <>
      <Navbar />
      <Typography variant='h2'> Welcome! Use the tabs above to navigate this site. </Typography>
    </>
  )
}
