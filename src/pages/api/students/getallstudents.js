import prisma from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const students = await prisma.students.findMany();
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ error: "Error fetching students" });
        }
    }
}