import { prisma } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }
    try {
        const courses = await prisma.courses.findMany();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Error fetching courses" });
    }
}