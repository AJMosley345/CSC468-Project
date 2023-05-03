import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const professorId = parseInt(req.query.id as string);
  
    try {
      const professor = await prisma.professor.findUnique({
        where: {
          id: professorId,
        },
        include: {
          courses_taught: true
        }
      });
  
      if (!professor) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json(professor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }