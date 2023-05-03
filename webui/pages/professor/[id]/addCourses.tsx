import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
    FormControl,
    Select,
    MenuItem,
    Button,
    Typography,
    Stack,
    Container
} from "@mui/material";
import { prisma } from "../../../lib/db";
import { Course, Professor } from "../../../interfaces";


export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const id = context.params?.id;
    const professor = await prisma.professor.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            courses_taught: true,
        }
    });
    return {
        props: professor,
    };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;


const AddCourses = ({ professor }: { professor: Professor }) => {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<number[]>([]);;
    const { id } = router.query;

    const handleAddCourses = async () => {
        try {
            const res = await fetch(`/api/professor/${id}/addCourses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    professorId: Number(id),
                    courseId: selectedCourse
                }),
            });
            setSelectedCourse([]);
            router.push(`/professor/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchClasses = async () => {
        try {
            const res = await fetch('/api/course/getAllCourses');
            const data = await res.json();
            setCourses(data);
        } catch (error) {
            console.error(error);
        }
        };

        fetchClasses();
    }, []);

    return(
        <Container>
            <Stack direction="column" >
                <FormControl sx={{width: 200}}>
                    <Select value={selectedCourse} onChange={ (event) => setSelectedCourse(event.target.value as number[])}>
                        <MenuItem defaultValue="Select a Course">Select a Course</MenuItem>
                        {courses.map((course) => (
                            <MenuItem key={course.course_id} value={course.course_id} >
                                {course.course_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedCourse}
                    onClick={handleAddCourses}
                    sx={{width: 150}}
                >
                    Add Course
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/professor/${id}`)}
                    sx={{ maxWidth: 200 }}
                >
                    Back to Profile
                </Button>
            </Stack>
        </Container>
    )
}

export default AddCourses;