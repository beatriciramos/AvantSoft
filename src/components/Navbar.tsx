import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";

import styles from "@styles/navbarStyles";

interface IProps {
  label: string;
  icon: any;
  screen?: string;
  active: boolean;
  onPress?: () => void;
}

interface NavbarProps {
  onLogout: () => void;
}

const NavItem: React.FC<IProps> = ({
  label,
  icon,
  screen,
  active,
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (screen) {
      navigation.navigate(screen as never);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.navItem, active ? styles.navItemActiveBorder : undefined]}
    >
      <Ionicons
        name={icon}
        size={20}
        color={active ? "#fd7e14" : "#28385e"}
        style={styles.icon}
      />
      <Text style={active ? styles.textActive : styles.textInactive}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function Navbar({ onLogout }: NavbarProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [language, setLanguage] = React.useState(i18n.language);

  const routes = useNavigationState((state) => state.routes);
  const index = useNavigationState((state) => state.index);
  const currentRouteName = routes[index]?.name;

  const toggleLanguage = () => {
    const newLang = language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  const handleLogout = () => {
    onLogout(); // Isso vai alterar o estado no App.tsx e voltar para Login
  };

  return (
    <View style={styles.container}>
      <NavItem
        label={t("dashboard")}
        icon="stats-chart-outline"
        screen="Dashboard"
        active={currentRouteName === "Dashboard"}
      />
      <NavItem
        label={t("users")}
        icon="people-outline"
        screen="Users"
        active={currentRouteName === "Users"}
      />
      <NavItem
        label={t("sales")}
        icon="cash-outline"
        screen="Sales"
        active={currentRouteName === "Sales"}
      />
      <NavItem
        label={t("exit")}
        icon="exit-outline"
        active={false}
        onPress={handleLogout}
      />
      <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
        <Ionicons name="language-outline" size={24} color="#28385e" />
      </TouchableOpacity>
    </View>
  );
}
