import React from "react";
import { Professor } from "../../../interfaces";
import { prisma } from "../../../lib/db";
import { GetServerSideProps } from "next";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const professor = await prisma.professor.findUnique({
        where: {
            id: Number(params?.id),
        },
        include: {
            courses_taught: true,
        }
    });
    return {
        props: professor,
    };
};

const ProfessorInfo: React.FC<Professor> = (props) => {
    let fullName = props.fullName;
    let username = props.username;
    let taught_courses = props.courses_taught;
    const router = useRouter();

    return(
        <>
            <Stack>
                <Typography>{fullName}</Typography>
                <Typography>{username}</Typography>
                <Typography>Class Schedule</Typography>
                {taught_courses && taught_courses.map((course) => 
                    <>
                        <Typography>{course.course_number}: {course.course_name}</Typography>
                    </>
                )}
            </Stack>
            <Button 
                variant="contained" 
                onClick={() => 
                router.push(
                    `/professor/${props.id.toString()}/addCourses`
                )}
            >
                Add Courses
            </Button>
            <Button 
                variant="contained" 
                onClick={() => 
                router.push(
                    `/professor/${props.id.toString()}/dropCourses`
                )}
            >
                Drop Courses
            </Button>
        </>
    )
}

export default ProfessorInfo;
