/*
  Warnings:

  - The primary key for the `Professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fullName` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `professor_id` on the `Professor` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fullName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `meetings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pass]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pass]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CoursesToProfessor` DROP FOREIGN KEY `_CoursesToProfessor_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CoursesToStudent` DROP FOREIGN KEY `_CoursesToStudent_B_fkey`;

-- DropIndex
DROP INDEX `Professor_professor_id_key` ON `Professor`;

-- DropIndex
DROP INDEX `Student_student_id_key` ON `Student`;

-- AlterTable
ALTER TABLE `Professor` DROP PRIMARY KEY,
    DROP COLUMN `fullName`,
    DROP COLUMN `professor_id`,
    ADD COLUMN `full_name` VARCHAR(250) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    DROP COLUMN `fullName`,
    DROP COLUMN `student_id`,
    ADD COLUMN `full_name` VARCHAR(250) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `meetings`;

-- CreateIndex
CREATE UNIQUE INDEX `Professor_id_key` ON `Professor`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Professor_pass_key` ON `Professor`(`pass`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_id_key` ON `Student`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_pass_key` ON `Student`(`pass`);

-- AddForeignKey
ALTER TABLE `_CoursesToProfessor` ADD CONSTRAINT `_CoursesToProfessor_B_fkey` FOREIGN KEY (`B`) REFERENCES `Professor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CoursesToStudent` ADD CONSTRAINT `_CoursesToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
