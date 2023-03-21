CREATE TABLE Student (
    student_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250),
    full_name VARCHAR(250)
);
CREATE TABLE Professor (
    professor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250),
    full_name VARCHAR(250)
);
CREATE TABLE Course (
    class_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(250)
);

CREATE TABLE  Student_Course (
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    PRIMARY KEY (student_id, class_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (class_id) REFERENCES Course(class_id)
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
    Course (class_name)
VALUES
    ("TestClass"),
    ("TestClass2"),
    ("TestClass3"),
    ("TestClass4");

INSERT INTO
    Student_Course (student_id, class_id)
VALUES
    (1, 2),
    (2, 3),
    (3, 1);

