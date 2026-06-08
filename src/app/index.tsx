import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const colors = {
  background: "#F1F5F9",
  surface: "#FFFFFF",
  primary: "#000058",
  primaryMuted: "#1E3A8A",
  primaryDisabled: "#94A3B8",
  text: "#0F172A",
  textSecondary: "#64748B",
  border: "#E2E8F0",
  borderFocus: "#6366F1",
  resultBackground: "#F8FAFC",
  resultBorder: "#CBD5E1",
  success: "#059669",
  error: "#DC2626",
};

class AccountChange {
  accountNumber: string;
  change: number;
  ref: string;

  constructor(data: { acc_no?: string; change?: string; ref?: string }) {
    this.accountNumber = data.acc_no?.trim() || "";
    this.change = parseFloat((data.change?.trim() || "").replace(",", ""));
    this.ref = data.ref?.trim() || "";
  }
}

export default function Index() {
  const [regexResult, setRegexResult] = useState("");
  const [regexString, setRegexString] = useState("/(hello|world)/gi");
  const [notificationMessage, setNotificationMessage] = useState(
    "Chào bạn, hello world! Đây là thông báo test regex cho group."
  );
  const [appId, setAppId] = useState("com.VCB");
  const [notificationUrl, setNotificationUrl] = useState(
    "https://boooringstuff.com.vn/"
  );
  const [appSecret, setAppSecret] = useState("App Secret");

  const canTest = Boolean(regexString && notificationMessage);
  const hasResult = Boolean(regexResult);
  const resultIsSuccess = hasResult && regexResult !== "No groups";

  const testRegex = () => {
    const regex = new RegExp(regexString);
    const groups = notificationMessage?.match(regex)?.groups;
    const accountChangeData = new AccountChange(groups || {});
    setRegexResult(groups ? JSON.stringify(accountChangeData) : "No groups");
  };

  const saveSettings = () => {
    const settings = {
      regexString,
      notificationMessage,
      appId,
      notificationUrl,
      appSecret,
    };
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Regex Tester</Text>
          <Text style={styles.subtitle}>
            Parse bank notification messages and preview extracted account
            changes.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Regex String</Text>
            <TextInput
              style={styles.input}
              value={regexString}
              onChangeText={setRegexString}
              placeholder="e.g. /(?<acc_no>\\d+)/gi"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Notification Message</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={notificationMessage}
              onChangeText={setNotificationMessage}
              placeholder="Paste a sample notification here"
              placeholderTextColor={colors.textSecondary}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>App ID</Text>
            <TextInput
              style={styles.input}
              value={appId}
              onChangeText={setAppId}
              placeholder="com.example.bank"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Notification URL</Text>
            <TextInput
              style={styles.input}
              value={notificationUrl}
              onChangeText={setNotificationUrl}
              placeholder="https://"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>App Secret</Text>
            <TextInput
              style={styles.input}
              value={appSecret}
              onChangeText={setAppSecret}
              placeholder="Enter app secret"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, !canTest && styles.buttonDisabled]}
            onPress={testRegex}
            disabled={!canTest}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Test Regex</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultSection}>
          <Text style={styles.resultLabel}>Regex Result</Text>
          <View
            style={[
              styles.resultCard,
              hasResult &&
                (resultIsSuccess
                  ? styles.resultCardSuccess
                  : styles.resultCardError),
            ]}
          >
            <Text
              style={[
                styles.result,
                hasResult &&
                  (resultIsSuccess
                    ? styles.resultSuccess
                    : styles.resultError),
              ]}
            >
              {regexResult || "Run a test to see parsed output here."}
            </Text>
          </View>

          <TouchableOpacity style={[styles.button, !resultIsSuccess && styles.buttonDisabled]} onPress={saveSettings} disabled={!resultIsSuccess}>
            <Text style={styles.buttonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  input: {
    width: "100%",
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.resultBackground,
  },
  inputMultiline: {
    minHeight: 112,
    paddingTop: 14,
  },
  button: {
    width: "100%",
    minHeight: 48,
    marginTop: 4,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.1)",
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.primaryDisabled,
    boxShadow: "none",
    elevation: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  resultSection: {
    gap: 8,
  },
  resultLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    paddingHorizontal: 4,
  },
  resultCard: {
    width: "100%",
    minHeight: 88,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.resultBorder,
    backgroundColor: colors.resultBackground,
  },
  resultCardSuccess: {
    borderColor: "#A7F3D0",
    backgroundColor: "#ECFDF5",
  },
  resultCardError: {
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
  },
  result: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    fontFamily: "monospace",
    width: "100%",
  },
  resultSuccess: {
    color: colors.success,
  },
  resultError: {
    color: colors.error,
  },
});
