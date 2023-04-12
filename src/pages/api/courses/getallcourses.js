import prisma from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const courses = await prisma.courses.findMany();
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching courses" });
        }
    }
}