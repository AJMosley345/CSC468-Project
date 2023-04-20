import { prisma } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const { username, password } = req.body;

    const professor = await prisma.professor.findUnique({
        where: { username },
    });

    const student = await prisma.student.findUnique({
        where: { username },
    });

    if (!professor && !student) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
    }

    if (professor && professor.pass !== password) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
    }

    if (student && student.pass !== password) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
    }

    if (professor) {
        res.status(200).json({ role: "professor", id: professor.professor_id });
    } else {
        res.status(200).json({ role: "student", id: student?.student_id });
    }
}