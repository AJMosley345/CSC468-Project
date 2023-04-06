CREATE USER 'remote'@'app' IDENTIFIED WITH mysql_native_password BY 'test1234';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'remote'@'app' WITH GRANT OPTION;

CREATE TABLE Students (
    student_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250),
    fullName VARCHAR(250)
);
CREATE TABLE Professors (
    professor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250),
    fullName VARCHAR(250)
);
CREATE TABLE Courses (
    course_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_number VARCHAR(250),
    course_name VARCHAR(250)
);

CREATE TABLE  Student_Course (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

INSERT INTO 
    Students (username, fullName)
VALUES 
    ("AM01", "Anthony Mosley"),
    ("AZ02", "Aroum Zombra"),
    ("MB03", "Michael Burns"),
    ("JH04", "Joey Haywood"),
    ("HK05", "Hayden Kanak");

INSERT INTO
    Professors (username, fullName)
VALUES
    ("TProfessor", "Test Professor"),
    ("TProfessor2", "Test Professor2"),
    ("TProfessor3", "Test Professor3"),
    ("TProfessor4", "Test Professor4");

INSERT INTO
    Courses (course_number, course_name)
VALUES
    ('CSC 112','Programming & Data Science'), --  1
    ('CSC 115','Introduction to Computer Programming'), -- 2
    ('CSC 141','Computer Science I'), -- 3
    ('CSC 142','Computer Science II'), -- 4
    ('CSC 220','Foundations of Computer Science'), -- 5
    ('CSC 231','Computer Systems'), -- 6
    ('CSC 240','Computer Science III'),-- 7
    ('CSC 241','Data Structures and Algorithms'),-- 8
    ('CSC 242','Computer Organization'),-- 9
    ('CSC 301','Computer Security & Ethics'),-- 10
    ('CSC 302','Computer Security'),-- 11
    ('CSC 317','Introduction to Digital Image Processing'),-- 12
    ('CSC 321','Database Management Systems'),-- 13
    ('CSC 331','Operating Systems'),-- 14
    ('CSC 335','Data Communications and Networking I'),-- 15
    ('CSC 336','Data Communications and Networking II'),-- 16
    ('CSC 345','Programming Language Concepts and Paradigms'),-- 17
    ('CSC 400','Internship'), -- 18
    ('CSC 402','Software Engineering'),-- 19
    ('CSC 404','Software Engineering & Testing'),-- 20
    ('CSC 416','Design and Construction of Compilers'),-- 21
    ('CSC 417','User Interfaces'),-- 22
    ('CSC 466','Distributed and Parallel Programming'),-- 23
    ('CSC 467','Big Data Engineering'),-- 24
    ('CSC 468','Introduction to Cloud Computing'),-- 25
    ('CSC 471','Modern Malware Analysis'),-- 26
    ('CSC 472','Software Security'),-- 27
    ('CSC 476','Game Development'),-- 28
    ('CSC 481','Artificial Intelligence'),-- 29
    ('CSC 490','Independent Project'),-- 30
    ('CSC 495','Topics in Computer Science'),-- 31
    ('CSC 496','Topics in Complex Systems'),-- 32
    ('CSC 497','Topics in Computer Security'),-- 33
    ('CSC 499','Independent Study in Computer Science');-- 34