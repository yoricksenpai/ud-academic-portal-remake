-- CreateTable
CREATE TABLE "ClassSession" (
    "id" UUID NOT NULL PRIMARY KEY,
    "courseId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "repeatWeekly" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT "ClassSession_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ClassSession_courseId_idx" ON "ClassSession"("courseId");

-- AlterTable
ALTER TABLE "Student" ADD COLUMN "phoneNumber" TEXT;
