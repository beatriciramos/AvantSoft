import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#28385e",
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },

  userList: {
    maxHeight: 60,
    marginBottom: 16,
  },

  userItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 12,
  },

  userItemSelected: {
    backgroundColor: "#ff7a00",
    borderColor: "#ff7a00",
  },

  userText: {
    color: "#28385e",
    fontWeight: "600",
  },

  userTextSelected: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 16,
  },

  addButton: {
    backgroundColor: "#ff7a00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  salesTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#28385e",
  },

  salesList: {
    maxHeight: 300,
  },

  saleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  saleDate: {
    color: "#444",
    fontWeight: "600",
  },

  saleValue: {
    color: "#ff7a00",
    fontWeight: "700",
  },

  noSalesText: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;
