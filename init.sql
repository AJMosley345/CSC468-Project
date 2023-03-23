CREATE TABLE Students (
    student_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250),
    full_name VARCHAR(250)
);
CREATE TABLE Professors (
    professor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250),
    full_name VARCHAR(250)
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
    Student (username, full_name)
VALUES 
    ("AM01", "Anthony Mosley"),
    ("TU02", "Test User2"),
    ("TU03", "Test User3"),
    ("TU04", "Test User4");

INSERT INTO
    Professor (username, full_name)
VALUES
    ("TProfessor","Test Professor"),
    ("TProfessor2","Test Professor2"),
    ("TProfessor3","Test Professor3"),
    ("TProfessor4","Test Professor4");

INSERT INTO
    Course (course_number, course_name)
VALUES
    ("1", "TestClass"),
    ("1","TestClass2"),
    ("3","TestClass3"),
    ("4","TestClass4");

INSERT INTO
    Student_Course (student_id, class_id)
VALUES
    (1, 2),
    (2, 3),
    (3, 1);

