import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { registerFonts } from "@/lib/pdf-fonts";

registerFonts();

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: "Noto Sans JP",
    fontSize: 10,
    color: "#1e293b",
    backgroundColor: "#ffffff",
  },
  border: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderWidth: 2,
    borderColor: "#1d4ed8",
  },
  innerBorder: {
    position: "absolute",
    top: 25,
    left: 25,
    right: 25,
    bottom: 25,
    borderWidth: 0.5,
    borderColor: "#93c5fd",
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  titleLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1d4ed8",
    letterSpacing: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0f172a",
    letterSpacing: 6,
  },
  divider: {
    height: 1.5,
    backgroundColor: "#1d4ed8",
    marginVertical: 20,
  },
  bodyText: {
    fontSize: 11,
    textAlign: "center",
    color: "#475569",
    marginBottom: 30,
    lineHeight: 1.8,
  },
  courseBlock: {
    marginVertical: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 4,
    backgroundColor: "#eff6ff",
    alignItems: "center",
  },
  sessionLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1d4ed8",
    marginBottom: 6,
    letterSpacing: 2,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
  },
  staffBlock: {
    marginTop: 20,
    alignItems: "center",
  },
  staffName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    paddingBottom: 4,
    marginBottom: 4,
  },
  staffLabel: {
    fontSize: 9,
    color: "#64748b",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 6,
  },
  infoText: {
    fontSize: 9,
    color: "#64748b",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 60,
    right: 60,
    alignItems: "center",
  },
  completedDate: {
    fontSize: 11,
    color: "#1e293b",
    marginBottom: 20,
  },
  issuedDate: {
    fontSize: 8,
    color: "#94a3b8",
  },
});

interface CertificateData {
  staffName: string;
  corporationName: string;
  facilityName: string;
  courseTitle: string;
  sessionLabel: string | null;
  completedAt: string;
  issuedAt: string;
}

export function Certificate({ data }: { data: CertificateData }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.border} />
        <View style={styles.innerBorder} />

        <View style={styles.header}>
          <Text style={styles.titleLabel}>CERTIFICATE OF COMPLETION</Text>
          <Text style={styles.title}>研 修 修 了 証</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>
          下記の者は、所定の研修プログラムを修了したことを証します。
        </Text>

        <View style={styles.staffBlock}>
          <Text style={styles.staffName}>{data.staffName} 様</Text>
          <Text style={styles.staffLabel}>{data.corporationName}　{data.facilityName}</Text>
        </View>

        <View style={styles.courseBlock}>
          {data.sessionLabel && (
            <Text style={styles.sessionLabel}>{data.sessionLabel}</Text>
          )}
          <Text style={styles.courseTitle}>{data.courseTitle}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.completedDate}>修了日：{data.completedAt}</Text>
          <View style={styles.divider} />
          <Text style={styles.issuedDate}>発行日：{data.issuedAt}　　発行元：{data.corporationName}　{data.facilityName}</Text>
        </View>
      </Page>
    </Document>
  );
}
