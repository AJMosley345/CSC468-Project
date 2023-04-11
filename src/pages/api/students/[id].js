import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const students = await prisma.students.findMany();
  const paths = students.map((student) => ({
    params: { id: student.student_id.toString() },
  }));
  res.json({ paths, fallback: true });
}