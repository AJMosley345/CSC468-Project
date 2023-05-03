import { prisma } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllStudents(
    req: NextApiRequest,
    res: NextApiResponse
){
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    try {
        const students = await prisma.student.findMany();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
}