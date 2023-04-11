import { Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { student_id, course_id } = req.body;

  try {
    const student = await prisma.students.findUnique({
      where: {
        student_id: Number(student_id),
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const course = await prisma.courses.findUnique({
      where: {
        course_id: Number(course_id),
      },
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const studentCourse = await prisma.student_courses.create({
      data: {
        student_id: Number(student_id),
        course_id: Number(course_id),
      },
    });

    res.status(200).json({ studentCourse });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}