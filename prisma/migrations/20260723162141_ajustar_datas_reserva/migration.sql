/*
  Warnings:

  - You are about to drop the column `data` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `horarioFim` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `dataHoraFim` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataHoraInicio` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "data",
DROP COLUMN "horarioFim",
DROP COLUMN "horarioInicio",
ADD COLUMN     "dataHoraFim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataHoraInicio" TIMESTAMP(3) NOT NULL;
