-- Second migration file
-- AlterTable
ALTER TABLE "Student" 
  ADD COLUMN "academicYear" TEXT NOT NULL DEFAULT '2023-2024',
  ADD COLUMN "faculty" TEXT NOT NULL DEFAULT 'Sciences',
  ADD COLUMN "program" TEXT NOT NULL DEFAULT 'General',
  ADD COLUMN "level" TEXT NOT NULL DEFAULT 'Undergraduate',
  ADD COLUMN "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "userId" TEXT,
  ADD COLUMN "status" "Status" NOT NULL DEFAULT 'PENDING';