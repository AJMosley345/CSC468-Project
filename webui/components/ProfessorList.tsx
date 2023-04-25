import React from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Professor } from "../interfaces";

const ProfessorList: React.FC<{ professor: Professor }> = ({ professor }) => {
    const router = useRouter();

    return(
        <>
            <Typography>{professor.username}: {professor.fullName}</Typography>
            <Button variant="contained" onClick={()=> router.push(`/professor/${professor.id}`)}>Profile</Button>
        </>
    )
}

export default ProfessorList;