import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
    padding: 16,
  },
  chartWrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  filterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  chart: {
    borderRadius: 16,
    paddingRight: 30,
  },
  highlightsWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  highlightsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7a00",
    marginBottom: 8,
  },
  highlightItem: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
  },
  emptyHighlight: {
    color: "#999",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#28385e",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    fontSize: 16,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  filterInput: {
    flex: 1,
    marginRight: 10,
  },
  addIcon: {
    padding: 8,
    backgroundColor: "#ff7a00",
    borderRadius: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  salesTitle: {
    marginTop: 8,
    fontWeight: "500",
    color: "#ff7a00",
  },
});
export default styles;

export const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fffaf2",
  backgroundGradientTo: "#fd7e14",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(40, 56, 94, ${opacity})`, // <- ESSA É A FUNÇÃO
  labelColor: (opacity = 1) => `rgba(40, 56, 94, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    stroke: "#e3e3e3",
  },
  propsForLabels: {
    fontSize: 10,
    fontWeight: "bold",
  },
};
