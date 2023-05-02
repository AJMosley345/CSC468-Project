import { Course } from "./Course";

export interface Professor {
    id: number;
    username: string;
    full_name: string;
    courses_taught: Course[];
}