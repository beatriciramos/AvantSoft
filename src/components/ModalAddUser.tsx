import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput as RNTextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "@styles/usersStyles";
import { useClients } from "src/contexts/ClientContext";
import { IClient } from "src/types/client";

interface IProps {
  modalVisible: boolean;
  onClose: () => void;
  filterText: string;
  setFiltered: any;
  setFilterText: any;
}

export default function ModalAddUser({
  modalVisible,
  onClose,
  filterText,
  setFiltered,
  setFilterText,
}: IProps) {
  const { t } = useTranslation();
  const { adicionarCliente } = useClients();

  const [clients, setClients] = React.useState<IClient[]>([]);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [form, setForm] = React.useState<Omit<IClient, "vendas">>({
    nomeCompleto: "",
    email: "",
    nascimento: "",
  });
  const [editingEmail, setEditingEmail] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<{
    nomeCompleto?: string;
    email?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.nomeCompleto)
      newErrors.nomeCompleto = t("nameRequired") || "Nome é obrigatório";
    if (!form.email)
      newErrors.email = t("emailRequired") || "Email é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (editingEmail) {
      const updated = clients.map((c) =>
        c.email === editingEmail ? { ...form, vendas: c.vendas } : c
      );
      setClients(updated);
      setFiltered(
        updated.filter((c) =>
          c.nomeCompleto.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      adicionarCliente({ ...form, vendas: [] });
    }
    setForm({ nomeCompleto: "", email: "", nascimento: "" });
    setEditingEmail(null);
    onClose();
    setFilterText("");
  };

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setForm({ ...form, nascimento: formatted });
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalWrapper}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, justifyContent: "center" }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          >
            <View style={styles.modalDrawer}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#28385e" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>
                {form.email ? t("editClient") : t("addClient")}
              </Text>

              <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                keyboardShouldPersistTaps="handled"
              >
                <RNTextInput
                  placeholder={t("name") || "Nome"}
                  value={form.nomeCompleto}
                  onChangeText={(v) => setForm({ ...form, nomeCompleto: v })}
                  style={styles.modalInput}
                />
                {errors.nomeCompleto && (
                  <Text style={{ color: "red" }}>{errors.nomeCompleto}</Text>
                )}

                <RNTextInput
                  placeholder={t("email") || "Email"}
                  value={form.email}
                  onChangeText={(v) => setForm({ ...form, email: v })}
                  style={styles.modalInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                )}

                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.modalInput}
                >
                  <Text style={{ color: form.nascimento ? "#000" : "#aaa" }}>
                    {form.nascimento || t("birthdate") || "Data de nascimento"}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={
                      form.nascimento ? new Date(form.nascimento) : new Date()
                    }
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChangeDate}
                    maximumDate={new Date()}
                  />
                )}

                <TouchableOpacity
                  onPress={handleSave}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>{t("save")}</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
