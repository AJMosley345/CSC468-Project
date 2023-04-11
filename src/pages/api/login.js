import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function login(req, res) {
    const { username, password } = req.body;

    try {
        const student = await prisma.students.findFirst({
            where: { username },
        });
        const professor = await prisma.professors.findFirst({
            where: { username },
        });

        if (student && student.pass === password) {
            res.status(200).json({ role: 'student', userId: student.student_id });
        } else if (professor && professor.pass === password) {
            res.status(200).json({ role: 'professor', userId: professor.professor_id });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}