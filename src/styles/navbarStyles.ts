import { StyleSheet } from "react-native";

export const iconActiveColor = "#fd7e14";
export const iconInactiveColor = "#28385e";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff4e3",
    paddingTop: 60,
  },

  navItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  navItemActiveBorder: {
    borderBottomWidth: 3,
    borderBottomColor: "#fd7e14",
  },

  icon: {
    marginRight: 5,
  },

  textActive: {
    color: "#fd7e14",
    fontWeight: "600",
  },

  textInactive: {
    color: "#28385e",
    fontWeight: "600",
  },

  languageButton: {
    padding: 10,
  },
});

export default styles;
