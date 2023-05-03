import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Course } from "../../interfaces";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { prisma } from "../../lib/db";
import CourseList from "../../components/CourseList";

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const courseList = await prisma.courses.findMany();
    return {
        props: { courseList },
        revalidate: 10,
    };
};
type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type Courses = {
    courseList: Course[]
}

const ClassList: React.FC<Courses> = (courses) => {
    return(
        <>
            <Typography>Class List</Typography>
            <Stack direction="column">
                {courses.courseList.map((course) => (
                    <div key={course.course_id.toString()}>
                        <CourseList course={course}/>
                    </div>
                ))}
            </Stack>
        </>
    )
}

export default ClassList;
