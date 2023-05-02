import React from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Student } from "../interfaces";

const Student: React.FC<{ student: Student }> = ({ student }) => {
  const router = useRouter();

  return (
    <>
      <Typography>{student.full_name}</Typography>
      <Button
        variant="contained"
        onClick={() => router.push(`/student/${student.id}`)}
      >
        Profile
      </Button>
    </>
  );
}

export default Student;