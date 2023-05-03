import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const studentId = parseInt(req.query.id as string);
  
    try {
      const student = await prisma.student.findUnique({
        where: {
          id: studentId,
        },
        include: {
          courses_taken: true
        }
      });
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }