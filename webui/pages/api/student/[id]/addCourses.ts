import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { courseId } = req.body;
    try {
        const studentId = Number(id);
        const student = await prisma.student.update({
            where: {
                id: studentId,
            },
            data: {
                courses_taken: {
                    connect: {
                        course_id: courseId
                    }
                },
            },
            include: {
                courses_taken: true
            }
        });

        res.status(200).json({ student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to add courses to student' });
    }
}