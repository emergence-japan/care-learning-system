// ============================================================
// Domain Enums (Prisma スキーマと同期)
// ============================================================

export type Role = "SUPER_ADMIN" | "HQ" | "ADMIN" | "STAFF";

export type EnrollmentStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type InquiryStatus = "UNREAD" | "READ" | "REPLIED" | "CLOSED";

export type Severity = "INFO" | "WARNING" | "CRITICAL";

// ============================================================
// Course / Learning Types
// ============================================================

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  explanation: string | null;
  choices: Choice[];
}

export interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  introduction: string | null;
  learningObjectives: string | null;
  videoUrl: string | null;
  badgeLabel: string | null;
  badgeIcon: string | null;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  actionPlan: string | null;
  completedAt: string | null; // ISO string (シリアライズ後)
}

// ============================================================
// Organization Types
// ============================================================

export interface Facility {
  id: string;
  name: string;
  type: string | null;
  corporationId: string | null;
  maxStaff: number;
  isActive: boolean;
}

export interface Corporation {
  id: string;
  name: string;
  fiscalYearStartMonth: number;
  maxFacilities: number;
  maxStaff: number;
  isActive: boolean;
}

// ============================================================
// User Types
// ============================================================

export interface User {
  id: string;
  name: string;
  loginId: string;
  role: Role;
  facilityId: string | null;
  corporationId: string | null;
}

// ============================================================
// Report Types
// ============================================================

export interface SummaryReportCourse {
  title: string;
  targetCount: number;
  completedCount: number;
  completionRate: number;
  plannedEndDate: string;
  actualEndDate: string;
  learningObjectives: string;
  curriculum: string[];
}

export interface SummaryData {
  facilityName: string;
  fiscalYear: number;
  generatedAt: string;
  courses: SummaryReportCourse[];
}

export interface StaffReportEnrollment {
  courseTitle: string;
  status: EnrollmentStatus;
  completedAt: string | null;
  actionPlan: string | null;
  score?: number;
  total?: number;
}

export interface StaffReportData {
  staffName: string;
  facilityName: string;
  generatedAt: string;
  fiscalYear: number;
  enrollments: StaffReportEnrollment[];
}

export interface StaffMember {
  id: string;
  name: string;
  reportData: StaffReportData;
}

// ============================================================
// Server Action Result Type
// ============================================================

export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: string };
