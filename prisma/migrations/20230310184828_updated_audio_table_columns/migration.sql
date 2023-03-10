/*
  Warnings:

  - Added the required column `audioLengthSeconds` to the `audios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `audios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audios" ADD COLUMN     "audioLengthSeconds" INTEGER NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL;
