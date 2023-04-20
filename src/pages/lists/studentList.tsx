import { GetStaticProps } from "next";
import StudentList from "../../../components/StudentList";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { prisma } from "../../../lib/db";
import { Student } from "../../../interfaces";

export const getStaticProps: GetStaticProps = async () => {
    const studentList = await prisma.student.findMany();
    return {
        props: { studentList },
        revalidate: 10,
    };
};

type Students = {
    studentList: Student[]
}

const ClassList: React.FC<Students> = (students) => {
    return(
        <>
            <Typography>Students</Typography>
            <Stack direction="column">
                {students.studentList.map((student) => (
                    <div key={student.student_id.toString()}>
                        <StudentList student={student}/>
                    </div>
                ))}
            </Stack>
        </>
    )
}

export default ClassList;