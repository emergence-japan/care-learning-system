import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { registerFonts } from "@/lib/pdf-fonts";

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
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    backgroundColor: "#f1f5f9",
    padding: 6,
    marginTop: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#1e293b",
  },
  table: {
    display: "flex",
    width: "auto",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    fontWeight: "bold",
  },
  tableCol: {
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
  },
  col1: { width: "38%" }, // Course Name (Increased)
  col2: { width: "9%", textAlign: "center" }, // Target
  col3: { width: "9%", textAlign: "center" }, // Completed
  col4: { width: "9%", textAlign: "center" }, // Rate
  col5: { width: "17.5%", textAlign: "center" }, // Planned
  col6: { width: "17.5%", textAlign: "center" }, // Actual
  lastCol: { borderRightWidth: 0 },
  
  // Curriculum styles
  curriculumCard: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 5,
    flexDirection: "column", // Ensure vertical stacking
  },
  courseTitleLarge: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
  },
  sectionBlock: {
    marginBottom: 12, // Space between sections
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#64748b",
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 9,
    lineHeight: 1.4,
  },
  curriculumItem: {
    fontSize: 9,
    color: "#475569",
    marginLeft: 10,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
  },
});

interface ReportData {
  facilityName: string;
  fiscalYear: number;
  generatedAt: string;
  courses: Array<{
    title: string;
    targetCount: number;
    completedCount: number;
    completionRate: number;
    plannedEndDate: string;
    actualEndDate: string;
    learningObjectives: string;
    curriculum: string[];
  }>;
}

export function SummaryReport({ data }: { data: ReportData }) {
  return (
    <Document>
      {/* 1枚目：実績対比表 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>令和{data.fiscalYear - 2018}年度 法定研修実施状況報告書（実績対比）</Text>

        <View style={styles.headerInfo}>
          <View>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text style={styles.label}>施設名：</Text>
              <Text>{data.facilityName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>対象年度：</Text>
              <Text>{data.fiscalYear}年度</Text>
            </View>
          </View>
          <View>
            <Text>発行日：{data.generatedAt}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>1. 計画と実績の対比表</Text>
        
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCol, styles.col1]}><Text>研修科目</Text></View>
            <View style={[styles.tableCol, styles.col2]}><Text>対象</Text></View>
            <View style={[styles.tableCol, styles.col3]}><Text>修了</Text></View>
            <View style={[styles.tableCol, styles.col4]}><Text>率</Text></View>
            <View style={[styles.tableCol, styles.col5]}><Text>計画期限</Text></View>
            <View style={[styles.tableCol, styles.col6, styles.lastCol]}><Text>実施完了日</Text></View>
          </View>
          
          {data.courses.map((course, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCol, styles.col1]}><Text>{course.title}</Text></View>
              <View style={[styles.tableCol, styles.col2]}><Text>{course.targetCount}</Text></View>
              <View style={[styles.tableCol, styles.col3]}><Text>{course.completedCount}</Text></View>
              <View style={[styles.tableCol, styles.col4]}><Text>{course.completionRate}%</Text></View>
              <View style={[styles.tableCol, styles.col5]}><Text>{course.plannedEndDate}</Text></View>
              <View style={[styles.tableCol, styles.col6, styles.lastCol]}>
                <Text style={{ color: course.actualEndDate === "未完了" ? "#ef4444" : "#333" }}>
                  {course.actualEndDate}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 9, color: "#64748b", lineHeight: 1.6 }}>
            ※ 本報告書は、厚生労働省の定める運営基準に基づき、適切に研修が実施されたことを証明するものです。
            計画期限に対し、全てのスタッフが受講を完了していることをもって「実績完了」としています。
          </Text>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `第 ${pageNumber} / ${totalPages} ページ`
        )} fixed />
      </Page>

      {/* 2枚目以降：カリキュラム概要 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>研修カリキュラム概要（裏付け資料）</Text>
        
        <Text style={styles.sectionTitle}>2. 各科目の学習内容詳細</Text>

        {data.courses.map((course, index) => (
          <View key={index} style={styles.curriculumCard} wrap={false}>
            <Text style={styles.courseTitleLarge}>{course.title}</Text>
            
            <View style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 9, fontWeight: "bold", color: "#64748b" }}>【学習目標】</Text>
              <Text style={{ fontSize: 9, marginTop: 2 }}>{course.learningObjectives}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 9, fontWeight: "bold", color: "#64748b" }}>【主な学習項目（スライド構成）】</Text>
              {course.curriculum.map((item, i) => (
                <Text key={i} style={styles.curriculumItem}>・ {item}</Text>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `第 ${pageNumber} / ${totalPages} ページ`
        )} fixed />
      </Page>
    </Document>
  );
}
