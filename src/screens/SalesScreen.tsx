import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useClients } from "src/contexts/ClientContext";
import { IClient, IVenda } from "src/types/client";
import styles from "@styles/salesStyles";

export default function SalesScreen() {
  const { t } = useTranslation();
  const { clientes, adicionarVenda } = useClients();

  const [selectedUserEmail, setSelectedUserEmail] = React.useState<
    string | null
  >(null);
  const [saleDate, setSaleDate] = React.useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [saleValue, setSaleValue] = React.useState("");

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const onChangeDate = (_event: any, selected?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selected) setSaleDate(selected);
  };

  const addSale = () => {
    if (!selectedUserEmail) {
      Alert.alert(t("selectUserFirst") || "Selecione um usuário primeiro.");
      return;
    }
    if (!saleDate) {
      Alert.alert(t("fillValidDateValue") || "Preencha uma data válida.");
      return;
    }
    if (!saleValue || isNaN(Number(saleValue))) {
      Alert.alert(t("fillValidDateValue") || "Preencha um valor válido.");
      return;
    }

    adicionarVenda(selectedUserEmail, {
      data: formatDate(saleDate),
      valor: Number(saleValue),
    });

    setSaleDate(null);
    setSaleValue("");
    setSelectedUserEmail(null);
    Alert.alert(t("saleAdded") || "Venda adicionada com sucesso!");
  };

  const renderVenda = ({ item }: { item: IVenda }) => (
    <View style={styles.saleItem}>
      <Text style={styles.saleDate}>{item.data}</Text>
      <Text style={styles.saleValue}>R$ {item.valor.toFixed(2)}</Text>
    </View>
  );

  const renderUser = ({ item }: { item: IClient }) => (
    <TouchableOpacity
      style={[
        styles.userItem,
        selectedUserEmail === item.email && styles.userItemSelected,
      ]}
      onPress={() => setSelectedUserEmail(item.email)}
    >
      <Text
        style={[
          styles.userText,
          selectedUserEmail === item.email && styles.userTextSelected,
        ]}
      >
        {item.nomeCompleto} ({item.email})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("addSaleForUser")}</Text>

      <Text style={styles.label}>{t("selectUser")}</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.email}
        renderItem={renderUser}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.userList}
      />

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text style={{ color: saleDate ? "#000" : "#888" }}>
          {saleDate
            ? formatDate(saleDate)
            : t("saleDate") || "Data (YYYY-MM-DD)"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={saleDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      <TextInput
        placeholder={t("saleValue") || "Valor"}
        value={saleValue}
        onChangeText={setSaleValue}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.addButton} onPress={addSale}>
        <Text style={styles.addButtonText}>{t("addSale")}</Text>
      </TouchableOpacity>

      {selectedUserEmail && (
        <>
          <Text style={styles.salesTitle}>
            {t("salesFor")}{" "}
            {clientes.find((c) => c.email === selectedUserEmail)?.nomeCompleto}
          </Text>
          <FlatList
            data={
              clientes.find((c) => c.email === selectedUserEmail)?.vendas || []
            }
            keyExtractor={(_, index) => String(index)}
            renderItem={renderVenda}
            style={styles.salesList}
            ListEmptyComponent={
              <Text style={styles.noSalesText}>{t("noSales")}</Text>
            }
          />
        </>
      )}
    </View>
  );
}
