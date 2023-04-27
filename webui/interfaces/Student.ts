import { Course } from "./Course";

export interface Student {
    id: number;
    username: string;
    fullName: string;
    courses_taken: Course[];
}