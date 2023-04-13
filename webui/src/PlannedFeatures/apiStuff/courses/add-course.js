import prisma from "../../../lib/db";

export default async function handler(req, res) {
    const { student_id, course_id } = req.body;

    try {
        const student = await prisma.students.update({
            where: { student_id: student_id },
            data: { Student_Course: { connect: { course_id: course_id} } }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Unable to add class' })
    }
}