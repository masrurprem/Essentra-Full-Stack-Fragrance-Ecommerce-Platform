-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetExpiresIn" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;
