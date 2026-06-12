-- Baseline sync migration.
--
-- These columns were previously introduced via `prisma db push` (i18n English
-- fields, staff locale, and the soft-delete `deletedAt`) and therefore exist in
-- the database but were never recorded in the migration history. This migration
-- records them so that the history matches the live schema.
--
-- Every statement uses `IF NOT EXISTS` and is idempotent: on the existing
-- database the columns are already present, so applying this changes nothing.
-- On a fresh database it recreates the same columns.

-- User: staff locale + soft-delete timestamp
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "locale" TEXT NOT NULL DEFAULT 'ja';
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

-- Course: English content fields
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "titleEn" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "descriptionEn" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "introductionEn" TEXT;
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "learningObjectivesEn" TEXT;

-- Slide: English content fields
ALTER TABLE "Slide" ADD COLUMN IF NOT EXISTS "titleEn" TEXT;
ALTER TABLE "Slide" ADD COLUMN IF NOT EXISTS "contentEn" TEXT;

-- Question: English content fields
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "textEn" TEXT;
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "explanationEn" TEXT;

-- Choice: English content field
ALTER TABLE "Choice" ADD COLUMN IF NOT EXISTS "textEn" TEXT;

-- ---------------------------------------------------------------------------
-- Structural drift introduced via `db push` (unique indexes, the per-assignment
-- enrollment column, and its foreign key). The live database already reflects
-- all of these; every statement below is idempotent and is a no-op there.
-- ---------------------------------------------------------------------------

-- Facility: unique key moved from (name) to (corporationId, name)
DROP INDEX IF EXISTS "Facility_name_key";
CREATE UNIQUE INDEX IF NOT EXISTS "Facility_corporationId_name_key" ON "Facility"("corporationId", "name");

-- CourseAssignment: dropped the old (facilityId, courseId) unique key
DROP INDEX IF EXISTS "CourseAssignment_facilityId_courseId_key";

-- Enrollment: switched from per-course to per-assignment uniqueness
ALTER TABLE "Enrollment" ADD COLUMN IF NOT EXISTS "assignmentId" TEXT;
DROP INDEX IF EXISTS "Enrollment_userId_courseId_key";
CREATE UNIQUE INDEX IF NOT EXISTS "Enrollment_userId_assignmentId_key" ON "Enrollment"("userId", "assignmentId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Enrollment_assignmentId_fkey'
  ) THEN
    ALTER TABLE "Enrollment"
      ADD CONSTRAINT "Enrollment_assignmentId_fkey"
      FOREIGN KEY ("assignmentId") REFERENCES "CourseAssignment"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
