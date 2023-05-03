import React from "react";
import { Student } from "../../interfaces";
import { prisma } from "../../lib/db";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const id = context.params?.id;
    const student = await prisma.student.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            courses_taken: {
                include: {
                    taught_by: true,
                }
            }
        }
    });
    return {
        props: student,
    };
};

const StudentInfo: React.FC<Student> = (props) => {
    let fullName = props.full_name;
    let username = props.username;
    let courses_taken = props.courses_taken;
    const router = useRouter();

    return(
        <>
        <Typography variant="h3">Student Profile</Typography>
            <>
                <Typography variant="h5">{fullName}</Typography>
                <Typography variant="h5">{username}</Typography>
                <Divider />
                <Typography variant="h4">Class Schedule </Typography>
                <Stack spacing={2} direction="row" alignItems="space-evenly" mb={3}>   
                    {courses_taken.map((course) => (
                        <div key={course.course_id}>
                            <Card sx={{ maxWidth: 400 }} style={{ backgroundColor: '#527bc4'}} variant="outlined" >
                                <CardContent sx={{ color: 'whitesmoke' }}>
                                    <Typography variant="h4">
                                        {course.course_number}
                                    </Typography>
                                    <Typography variant="h5">
                                        {course.course_name}
                                    </Typography>
                                    {course.taught_by?.map((professor) => (
                                        <Typography key={professor.id} variant="h5">
                                            {professor.full_name}
                                        </Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Stack>
            </>
            <Button 
                variant="contained" 
                onClick={() => 
                router.push(
                    `/student/${props.id.toString()}/addCourses`
                )}
                style={{ backgroundColor: '#527bc4'}}
            >
                Add Courses
            </Button>
            <Button 
                variant="contained" 
                onClick={() => 
                router.push(
                    `/student/${props.id.toString()}/dropCourses`
                )}
                style={{ backgroundColor: '#527bc4'}}
                sx={{ mx: 2 }}
            >
                Drop Courses
            </Button>
        </>
    )
}

export default StudentInfo;
