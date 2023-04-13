import prisma from "../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;
  const student = await prisma.students.findUnique({
    where: { student_id: Number(id) },
    include: {
      student_courses: {
        include: {
          courses: true,
        },
      },
    },
  });
  res.json({ props: { student } });
}