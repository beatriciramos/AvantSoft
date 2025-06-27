import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

type SalesChartProps = {
  chartData: {
    labels: string[];
    datasets: { data: number[] }[];
  };
};

export const SalesChart: React.FC<SalesChartProps> = ({ chartData }) => {
  if (!chartData || chartData.datasets[0].data.length === 0) {
    return null;
  }

  const maxVisibleBars = 6;
  const screenWidth = Dimensions.get("window").width;
  const barWidth = screenWidth / maxVisibleBars;

  return (
    <View style={{ marginVertical: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#28385e",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Vendas por Cliente
      </Text>
      <BarChart
        data={chartData}
        width={barWidth * chartData.labels.length + 50}
        height={300}
        fromZero
        showBarTops
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff4e3",
          backgroundGradientTo: "#fd7e14",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(40, 56, 94, ${opacity})`,
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
        }}
        verticalLabelRotation={45}
        style={{
          borderRadius: 16,
          paddingRight: 30,
        }}
        yAxisLabel={""}
        yAxisSuffix={""}
      />
    </View>
  );
};
