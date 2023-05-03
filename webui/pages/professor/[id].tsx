import React from "react";
import { Professor } from "../../interfaces";
import { prisma } from "../../lib/db";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const id = context.params?.id;
    const professor = await prisma.professor.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            courses_taught: {
                include: {
                    taken_by: true,
                }
            }
        }
    });
    return {
        props: professor,
    };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ProfessorInfo: React.FC<Professor> = (props) => {
    let fullName = props.full_name;
    let username = props.username;
    let taught_courses = props.courses_taught;
    const router = useRouter();

    return(
        <>
        <Typography>Professor Profile</Typography>
        <>
                <Typography variant="h5">{fullName}</Typography>
                <Typography variant="h5">{username}</Typography>
                <Divider />
                <Typography variant="h4">Class Schedule </Typography>
                <Stack spacing={2} direction="row" alignItems="space-evenly" mb={3}>   
                    {taught_courses.map((course) => (
                        <div key={course.course_id}>
                            <Card sx={{ maxWidth: 400 }} style={{ backgroundColor: '#527bc4'}} variant="outlined" >
                                <CardContent sx={{ color: 'whitesmoke' }}>
                                    <Typography variant="h4">
                                        {course.course_number}
                                    </Typography>
                                    <Typography variant="h5">
                                        {course.course_name}
                                    </Typography>
                                    <Divider />
                                    <Typography variant="h4">Roster:</Typography>
                                    {course.taken_by?.map((student) => (
                                        <Typography key={student.id} variant="h6">
                                            {student.full_name}
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
