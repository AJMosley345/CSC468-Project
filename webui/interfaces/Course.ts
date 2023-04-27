import { Professor, Student } from ".";

export interface Course {
    course_id: number;
    course_name: string;
    course_number: string;
    taught_by: Professor[];
    taken_by: Student[];
}