import { GetStaticProps } from "next";
import { Course } from "../../webui-db/webui/interfaces";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { prisma } from "../../webui-db/webui/lib/db";
import CourseList from "../../webui-db/webui/components/CourseList";

export const getStaticProps: GetStaticProps = async () => {
    const courseList = await prisma.courses.findMany();
    return {
        props: { courseList },
        revalidate: 10,
    };
};

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
