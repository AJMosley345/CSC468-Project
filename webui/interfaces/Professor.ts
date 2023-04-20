import { Course } from "./Course";

export interface Professor {
    professor_id: number;
    username: string;
    fullName: string;
    courses_taught: Course[];
}