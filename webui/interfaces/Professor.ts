import { Course } from "./Course";

export interface Professor {
    id: number;
    username: string;
    fullName: string;
    courses_taught: Course[];
}