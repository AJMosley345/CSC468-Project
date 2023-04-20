import { GetStaticProps } from "next";
import ProfessorList from "../../../components/ProfessorList";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { prisma } from "../../../lib/db";
import { Professor } from "../../../interfaces";

export const getStaticProps: GetStaticProps = async () => {
    const professorList = await prisma.professor.findMany();
    return {
        props: { professorList },
        revalidate: 10,
    };
};

type Professors = {
    professorList: Professor[]
}

const ClassList: React.FC<Professors> = (professors) => {
    return(
        <>
            <Typography>Professors</Typography>
            <Stack direction="column">
                {professors.professorList.map((professor) => (
                    <div key={professor.professor_id.toString()}>
                        <ProfessorList professor={professor}/>
                    </div>
                ))}
            </Stack>
        </>
    )
}

export default ClassList;