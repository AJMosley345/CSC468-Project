
import { prisma } from "../lib/db";

const professors = await prisma.$executeRaw`
    INSERT INTO
        Professor (username, pass, fullName)
    VALUES
        (${"TProfessor"}, ${"Z14VdAlyK"}, ${"Test Professor"}),
        (${"TProfessor2"}, ${"9fbzmBWeL"}, ${"Test Professor2"}),
        (${"TProfessor3"}, ${"XS98PtClR"}, ${"Test Professor3"}),
        (${"TProfessor4"}, ${"XqetLj4bO"}, ${"Test Professor4"});
`

const students = await prisma.$executeRaw`
    INSERT INTO 
    Student (username, pass, fullName)
    VALUES 
        (${"AM01"}, ${"J98xWOEEo"}, ${"Anthony Mosley"}),
        (${"AZ02"}, ${"oAm1yI8SQ"}, ${"Aroum Zombra"}),
        (${"MB03"}, ${"4aPJACpup"}, ${"Michael Burns"}),
        (${"JH04"}, ${"bVYFdjWB3"}, ${"Joey Haywood"}),
        (${"HK05"}, ${"4W6l9q9w3"}, ${"Hayden Kanak"});
`

const courses = await prisma.$executeRaw`
INSERT INTO Courses (course_number, course_name)
    VALUES     
    (${'CSC 112'},${'Programming & Data Science'}),
    (${'CSC 115'},${'Introduction to Computer Programming'}), 
    (${'CSC 141'},${'Computer Science I'}), 
    (${'CSC 142'},${'Computer Science II'}), 
    (${'CSC 220'},${'Foundations of Computer Science'}), 
    (${'CSC 231'},${'Computer Systems'}), 
    (${'CSC 240'},${'Computer Science III'}),
    (${'CSC 241'},${'Data Structures and Algorithms'}),
    (${'CSC 242'},${'Computer Organization'}),
    (${'CSC 301'},${'Computer Security & Ethics'}),
    (${'CSC 302'},${'Computer Security'}),
    (${'CSC 317'},${'Introduction to Digital Image Processing'}),
    (${'CSC 321'},${'Database Management Systems'}),
    (${'CSC 331'},${'Operating Systems'}),
    (${'CSC 335'},${'Data Communications and Networking I'}),
    (${'CSC 336'},${'Data Communications and Networking II'}),
    (${'CSC 345'},${'Programming Language Concepts and Paradigms'}),
    (${'CSC 400'},${'Internship'}),
    (${'CSC 402'},${'Software Engineering'}),
    (${'CSC 404'},${'Software Engineering & Testing'}),
    (${'CSC 416'},${'Design and Construction of Compilers'}),
    (${'CSC 417'},${'User Interfaces'}),
    (${'CSC 466'},${'Distributed and Parallel Programming'}),
    (${'CSC 467'},${'Big Data Engineering'}),
    (${'CSC 468'},${'Introduction to Cloud Computing'}),
    (${'CSC 471'},${'Modern Malware Analysis'}),
    (${'CSC 472'},${'Software Security'}),
    (${'CSC 476'},${'Game Development'}),
    (${'CSC 481'},${'Artificial Intelligence'}),
    (${'CSC 490'},${'Independent Project'}),
    (${'CSC 495'},${'Topics in Computer Science'}),
    (${'CSC 496'},${'Topics in Complex Systems'}),
    (${'CSC 497'},${'Topics in Computer Security'}),
    (${'CSC 499'},${'Independent Study in Computer Science'});
`;

async function main(){
    courses
    students
    professors
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})