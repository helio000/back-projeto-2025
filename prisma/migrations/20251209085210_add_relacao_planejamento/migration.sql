/*
  Warnings:

  - You are about to drop the column `data` on the `planejamento` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `planejamento` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `planejamento` table. All the data in the column will be lost.
  - Added the required column `atividade` to the `Planejamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diaSemana` to the `Planejamento` table without a default value. This is not possible if the table is not empty.
  - Made the column `professorId` on table `planejamento` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `planejamento` DROP FOREIGN KEY `Planejamento_professorId_fkey`;

-- DropIndex
DROP INDEX `Planejamento_professorId_fkey` ON `planejamento`;

-- AlterTable
ALTER TABLE `planejamento` DROP COLUMN `data`,
    DROP COLUMN `descricao`,
    DROP COLUMN `titulo`,
    ADD COLUMN `atividade` VARCHAR(191) NOT NULL,
    ADD COLUMN `diaSemana` VARCHAR(191) NOT NULL,
    MODIFY `professorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Planejamento` ADD CONSTRAINT `Planejamento_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `Professor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
