import { Course } from "./Course";

export interface Student {
    student_id: number;
    username: string;
    fullName: string;
    courses_taken: Course[];
}