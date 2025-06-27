import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import styles from "@styles/loginStyles";

interface IProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: IProps) {
  const { t } = useTranslation();

  const [email, setEmail] = React.useState("user@example.com");
  const [password, setPassword] = React.useState("123456");
  const [error, setError] = React.useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError(t("fillAllFields") || "Preencha todos os campos.");
      return;
    }

    if (email === "user@example.com" && password === "123456") {
      setError("");
      onLogin();
    } else {
      setError(t("invalidCredentials") || "E-mail ou senha incorretos.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.logo}>AvantSoft</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={t("email")}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder={t("password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#888"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
