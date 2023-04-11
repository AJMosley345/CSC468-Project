import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query;
  const student = await prisma.students.findUnique({
    where: { student_id: Number(id) },
    include: {
      Student_Course: {
        include: {
          Courses: true,
        },
      },
    },
  });
  res.json({ props: { student } });
}