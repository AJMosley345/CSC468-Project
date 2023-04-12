import prisma from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const professors = await prisma.professors.findMany();
            res.status(200).json(professors);
        } catch (error) {
            res.status(500).json({ error: "Error fetching professors" });
        }
    }
}