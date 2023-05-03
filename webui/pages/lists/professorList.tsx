import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import ProfessorList from "../../components/ProfessorList";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { prisma } from "../../lib/db";
import { Professor } from "../../interfaces";

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const professorList = await prisma.professor.findMany();
    return {
        props: { professorList },
        revalidate: 10,
    };
};
type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type Professors = {
    professorList: Professor[]
}

const ClassList: React.FC<Professors> = (professors) => {
    return(
        <>
            <Typography>Professors</Typography>
            <Stack direction="column">
                {professors.professorList.map((professor) => (
                    <div key={professor.id.toString()}>
                        <ProfessorList professor={professor}/>
                    </div>
                ))}
            </Stack>
        </>
    )
}

export default ClassList;
