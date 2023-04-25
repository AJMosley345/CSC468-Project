import React from "react";
import { Student } from "../../../interfaces";
import { prisma } from "../../../lib/db";
import { GetServerSideProps } from "next";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const student = await prisma.student.findUnique({
        where: {
            id: Number(params?.id),
        },
        include: {
            courses_taken: {
                include:{
                    taught_by: true
                }
            }
        }
    });
    return {
        props: {
            student,
        }
    };
};



const StudentInfo: React.FC<{ student: Student }> = ({ student }) => {
    let fullName = student.fullName;
    let username = student.username;
    let courses_taken = student.courses_taken;
    const router = useRouter();

    return(
        <>
            <Stack>
                <Typography>{fullName}</Typography>
                <Typography>{username}</Typography>
                <Typography>Class Schedule: </Typography>
                <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
                    {courses_taken && courses_taken.map((course) =>(
                        <Box sx={{ display: 'flex', flexDirection: 'column', border: 1, maxWidth: 250 }}>
                            <div key={course.course_id}>
                                <Typography>{course.course_number}</Typography>
                                <Typography>{course.course_name}</Typography>
                                {course.taught_by.map((professor) => (
                                    <Typography key={professor.id} component="span">
                                        {professor.fullName}
                                    </Typography>
                                ))}
                            <Divider />    
                            </div>
                        </Box>
                    ))}
                </Stack>
            </Stack>
            <Button 
                variant="contained" 
                onClick={() => 
                router.push(
                    `/student/${student.student_id.toString()}/addCourses`
                )}
                
            >
                Add Courses
            </Button>
            <Button 
                variant="contained" 
                onClick={() => 
                router.push(
                    `/student/${student.student_id.toString()}/dropCourses`
                )}
                sx={{ mx: 2 }}
            >
                Drop Courses
            </Button>
        </>
    )
}

export default StudentInfo;
