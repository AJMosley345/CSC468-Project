import React, { useState, useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { prisma } from "../../../lib/db";
import { Course, Student } from "../../../interfaces";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  const student = await prisma.student.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      courses_taken: true,
    },
  });
  const courses = await prisma.courses.findMany();
  return {
    props: { student, courses },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const DropCourses = ({
  student,
  courses,
}: {
  student: Student;
  courses: Course[];
}) => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<number[]>([]);

  // const handleSelectCourse = (
  //   event: React.ChangeEvent<{ value: number }>
  // ) => {
  //   setSelectedCourse(event.target.value);
  // };

  const handleDropCourses = async () => {
    try {
      const res = await fetch(`/api/student/${student.id}/dropCourses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: selectedCourse,
        }),
      });
      setSelectedCourse([]);
      router.push(`/student/${student.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  const currentCourses = student.courses_taken.map((course) => course.course_id);
  const filteredCourses = courses.filter((course) => currentCourses.includes(course.course_id));
  
  return (
    <Container>
      <Stack direction="column">
        <Typography variant="h4">Drop Courses</Typography>
        <FormControl sx={{ width: 200 }}>
          <Select
            value={selectedCourse.toString()}
            onChange={(event) => setSelectedCourse(event.target.value as unknown as number[])}
            defaultValue="Select a Course"
          >
            <MenuItem disabled value="Select a Course">
              Select a Course
            </MenuItem>
            {filteredCourses.map((course) => (
              <MenuItem key={course.course_id} value={course.course_id}>
                {course.course_name}
              </MenuItem>
            ))}
            {/* {courses.map((course) => (
              <MenuItem key={course.course_id} value={course.course_id}>
                {course.course_name}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedCourse}
          onClick={handleDropCourses}
          sx={{ width: 150 }}
        >
          Drop Course
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(`/student/${student.id}`)}
          sx={{ maxWidth: 200 }}
        >
          Back to Profile
        </Button>
      </Stack>
    </Container>
  );
};

export default DropCourses;
