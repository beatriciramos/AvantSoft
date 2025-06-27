import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

import { IClient } from "src/types/client";
import styles from "@styles/usersStyles";
import ModalAddUser from "@components/ModalAddUser";
import { useClients } from "src/contexts/ClientContext";
import { formatDateBR } from "@utils/formattingData";

export default function UsersScreen() {
  const { t } = useTranslation();
  const { clientes, deleteClient } = useClients();

  const [filterText, setFilterText] = React.useState("");
  const [filtered, setFiltered] = React.useState<IClient[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    setFiltered(
      clientes.filter((c) =>
        c.nomeCompleto.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [clientes, filterText]);

  const handleFilter = (text: string) => {
    setFilterText(text);
  };

  const confirmDelete = (email: string, nome: string) => {
    Alert.alert(
      t("confirmDeleteTitle") || "Confirmar exclusão",
      t("confirmDeleteMessage")?.replace("{name}", nome) ||
        `Tem certeza que deseja excluir ${nome}?`,
      [
        { text: t("cancel") || "Cancelar", style: "cancel" },
        {
          text: t("delete") || "Excluir",
          style: "destructive",
          onPress: () => deleteClient(email),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <TextInput
          placeholder={t("filterClients")}
          value={filterText}
          onChangeText={handleFilter}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Ionicons name="person-add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.nomeCompleto}</Text>
              <TouchableOpacity
                onPress={() => confirmDelete(item.email, item.nomeCompleto)}
              >
                <Ionicons name="trash" size={20} color="#c00" />
              </TouchableOpacity>
            </View>
            <Text>{item.email}</Text>
            <Text>
              {t("birthdate")}: {formatDateBR(item.nascimento)}{" "}
            </Text>
            <Text>
              {t("sales")}: {item.vendas.length}
            </Text>
          </View>
        )}
      />

      {modalVisible && (
        <ModalAddUser
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          filterText={filterText}
          setFilterText={setFilterText}
          setFiltered={setFiltered}
        />
      )}
    </View>
  );
}
