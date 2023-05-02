import { Course } from "./Course";

export interface Student {
    id: number;
    username: string;
    full_name: string;
    courses_taken: Course[];
}