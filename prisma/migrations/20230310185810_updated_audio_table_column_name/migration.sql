/*
  Warnings:

  - You are about to drop the column `audioLengthSeconds` on the `audios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "audios" DROP COLUMN "audioLengthSeconds",
ADD COLUMN     "audioDurationSeconds" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "name" SET DEFAULT 'Untitled',
ALTER COLUMN "transcript" SET DEFAULT 'No transcript provided',
ALTER COLUMN "summary" SET DEFAULT 'No summary provided',
ALTER COLUMN "prompt" SET DEFAULT 'No prompt provided';
