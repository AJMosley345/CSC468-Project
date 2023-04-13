import prisma from "../../../../lib/db";

export default async function handler(req, res){
  if (req.method !== "POST"){
    return res.status(405).json({ message: "Method not allowed" });
  }


  const { id } = req.query;
  const { selectedCourses } = req.body;

  try {
    const studentId = parseInt(id);
    const courses = await prisma.courses.findMany({
      where: {
        course_id: {
          in: selectedCourses
        }
      },
    });
    await prisma.students.update({
      where: {
        student_id: studentId
      },
      data: {
        student_courses: {
          connect: courses
        }
      },
    });
    return res.status(200).json({ message: "Courses saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}