import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { courseId } = req.body;

    try {
        const professorId = Number(id);
        const professor = await prisma.professor.update({
            where: {
                id: professorId,
            },
            data: {
                courses_taught: {
                    connect: {
                        course_id: courseId,
                    },
                },
            },
            include: {
                courses_taught: {
                    include: {
                        taught_by: true,
                    }
                }
            },
        });

        res.status(200).json({ professor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to add courses' });
    }
}