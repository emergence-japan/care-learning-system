import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { registerFonts } from "@/lib/pdf-fonts";
import type { StaffReportData } from "@/types";

registerFonts();

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Noto Sans JP",
    fontSize: 10,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  staffInfo: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    fontWeight: "bold",
    width: 80,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#1a365d",
    borderLeftWidth: 3,
    borderLeftColor: "#1a365d",
    paddingLeft: 8,
  },
  courseCard: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 4,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 5,
    marginBottom: 8,
  },
  courseTitle: {
    fontWeight: "bold",
    fontSize: 11,
  },
  statusBadge: {
    fontSize: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: "#10b981",
    color: "#fff",
  },
  notStartedBadge: {
    backgroundColor: "#94a3b8",
  },
  details: {
    fontSize: 9,
    color: "#64748b",
  },
  actionPlanBox: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
  },
  actionPlanLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 3,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
  },
});

export function StaffReport({ data }: { data: StaffReportData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>法定研修 受講記録証明書</Text>

        <View style={styles.staffInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>氏名：</Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>{data.staffName} 様</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>所属施設：</Text>
            <Text>{data.facilityName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>対象年度：</Text>
            <Text>{data.fiscalYear}年度</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>発行日：</Text>
            <Text>{data.generatedAt}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>受講済み研修科目一覧</Text>

        {data.enrollments.map((enroll, index) => (
          <View key={index} style={styles.courseCard} wrap={false}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{enroll.courseTitle}</Text>
              <Text style={[
                styles.statusBadge, 
                enroll.status !== "COMPLETED" ? styles.notStartedBadge : {}
              ]}>
                {enroll.status === "COMPLETED" ? "修了" : "未修了"}
              </Text>
            </View>
            
            <View style={styles.details}>
              <Text>修了日：{enroll.completedAt || "-"}</Text>
              {enroll.score !== undefined && (
                <Text style={{ marginTop: 2 }}>
                  テスト結果：{enroll.score} / {enroll.total} 点 (合格)
                </Text>
              )}
            </View>

            {enroll.actionPlan && (
              <View style={styles.actionPlanBox}>
                <Text style={styles.actionPlanLabel}>明日からの行動宣言</Text>
                <Text style={{ fontSize: 9, color: "#1e293b", lineHeight: 1.4 }}>
                  {enroll.actionPlan}
                </Text>
              </View>
            )}
          </View>
        ))}

        <View style={{ marginTop: 30, borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 10 }}>
          <Text style={{ fontSize: 8, color: "#64748b", textAlign: "right" }}>
            本受講記録は、厚生労働省の定める法定研修の受講状況を証明するものです。
          </Text>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `第 ${pageNumber} / ${totalPages} ページ`
        )} fixed />
      </Page>
    </Document>
  );
}
