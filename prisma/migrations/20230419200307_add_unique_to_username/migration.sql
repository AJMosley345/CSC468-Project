-- CreateTable
CREATE TABLE `Courses` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_number` VARCHAR(250) NULL,
    `course_name` VARCHAR(250) NULL,

    UNIQUE INDEX `Courses_course_id_key`(`course_id`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professor` (
    `professor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(250) NULL,
    `pass` VARCHAR(250) NULL,
    `fullName` VARCHAR(250) NULL,

    UNIQUE INDEX `Professor_professor_id_key`(`professor_id`),
    UNIQUE INDEX `Professor_username_key`(`username`),
    PRIMARY KEY (`professor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(250) NULL,
    `pass` VARCHAR(250) NULL,
    `fullName` VARCHAR(250) NULL,

    UNIQUE INDEX `Student_student_id_key`(`student_id`),
    UNIQUE INDEX `Student_username_key`(`username`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meetings` (
    `meeting_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`meeting_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CoursesToProfessor` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CoursesToProfessor_AB_unique`(`A`, `B`),
    INDEX `_CoursesToProfessor_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CoursesToStudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CoursesToStudent_AB_unique`(`A`, `B`),
    INDEX `_CoursesToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CoursesToProfessor` ADD CONSTRAINT `_CoursesToProfessor_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoursesToProfessor` ADD CONSTRAINT `_CoursesToProfessor_B_fkey` FOREIGN KEY (`B`) REFERENCES `Professor`(`professor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoursesToStudent` ADD CONSTRAINT `_CoursesToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoursesToStudent` ADD CONSTRAINT `_CoursesToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
