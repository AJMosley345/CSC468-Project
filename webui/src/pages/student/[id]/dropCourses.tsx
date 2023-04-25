import React from "react";
import { GetServerSideProps } from "next";
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
import { prisma } from "../../../../lib/db";
import { StudentProps } from "../../../../components/StudentList";



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const student = await prisma.student.findUnique({
        where: {
            id: Number(params?.id),
        },
        include: {
            courses_taken: true,
        }
    });
    return {
        props: student,
    };
};

const AddCourses : React.FC<StudentProps> = (props) => {
    let courses_taken = props.courses_taken;
    const router = useRouter();
    const [selectedCourse, setSelectedCourse] = useState<number[]>([]);;
    const { id } = router.query;

    const handleSelectCourse = (event: React.ChangeEvent<{ value: number[] }> ) => {
        setSelectedCourse(event.target.value as number[]);
    }

    const handleDeleteCourses = async () => {
        try {
            const res = await fetch(`/api/student/${id}/dropCourses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId: Number(id),
                    courseId: selectedCourse
                }),
            });
            setSelectedCourse([]);
            router.push(`/student/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Container>
            <Stack direction="column" >
                <FormControl sx={{width: 200}}>
                    <Select value={selectedCourse} onChange={handleSelectCourse}>
                        <MenuItem defaultValue="Select a Course">Select a Course</MenuItem>
                        {courses_taken.map((course) => (
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
                    onClick={handleDeleteCourses}
                    sx={{width: 150}}
                >
                    Drop Course
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/student/${id}`)}
                    sx={{ maxWidth: 200 }}
                >
                    Back to Profile
                </Button>
            </Stack>
        </Container>
    )
}

export default AddCourses;