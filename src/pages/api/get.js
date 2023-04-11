import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getStudents(req, res) {
    if (req.method === "GET") {
        try {
            const students = await prisma.students.findMany();
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ error: "Error fetching students" });
        }
    }
}

export default async function getProfessors(req, res) {
    if (req.method === "GET") {
        try {
            const professors = await prisma.professors.findMany();
            res.status(200).json(professors);
        } catch (error) {
            res.status(500).json({ error: "Error fetching professors" });
        }
    }
}