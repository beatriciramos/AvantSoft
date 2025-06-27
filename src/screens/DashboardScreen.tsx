import React from "react";
import { View, Text, TextInput, Dimensions, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import { PieChart, BarChart } from "react-native-chart-kit";

import { getMissingLetter } from "@utils/missingLetter";
import styles, { chartConfig } from "@styles/dashboardStyles";

import { IClient } from "src/types/client";
import { BarChartData, PieChartData } from "src/types/chart";
import { useClients } from "src/contexts/ClientContext";
import { formatDateBR } from "@utils/formattingData";

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { clientes } = useClients();

  const [filterText, setFilterText] = React.useState<string>("");

  const filtered: IClient[] = React.useMemo(() => {
    return clientes.filter((c) =>
      c.nomeCompleto.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [clientes, filterText]);

  const chartData: BarChartData = React.useMemo(() => {
    const vendas = clientes.flatMap((c) =>
      c.vendas.map((v) => ({
        ...v,
        nome: c.nomeCompleto.split(" ")[0],
      }))
    );

    return {
      labels: vendas.map((v) => `${v.nome} - ${v.data.slice(5)}`),
      datasets: [{ data: vendas.map((v) => Number(v.valor)) }],
    };
  }, [clientes]);

  const pieData: PieChartData[] = React.useMemo(() => {
    return clientes.map((c) => ({
      name: c.nomeCompleto.split(" ")[0],
      sales: c.vendas.reduce((sum, v) => sum + v.valor, 0),
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      legendFontColor: "#28385e",
      legendFontSize: 12,
    }));
  }, [clientes]);

  const { topSales, highestAvg, mostFrequent, totalVendasGeral } =
    React.useMemo(() => {
      let topSales: (IClient & { total: number }) | null = null;
      let highestAvg: (IClient & { avg: number }) | null = null;
      let mostFrequent: (IClient & { count: number }) | null = null;

      let totalVendasGeral = 0;

      for (const c of clientes) {
        const total = c.vendas.reduce((sum, v) => sum + v.valor, 0);
        const avg = c.vendas.length ? total / c.vendas.length : 0;
        totalVendasGeral += total;

        if (!topSales || total > topSales.total) topSales = { ...c, total };
        if (!highestAvg || avg > highestAvg.avg) highestAvg = { ...c, avg };
        if (!mostFrequent || c.vendas.length > mostFrequent.count)
          mostFrequent = { ...c, count: c.vendas.length };
      }

      return { topSales, highestAvg, mostFrequent, totalVendasGeral };
    }, [clientes]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 10 }}
    >
      <TextInput
        style={styles.input}
        placeholder={t("filterClients")}
        value={filterText}
        onChangeText={setFilterText}
      />
      {pieData.length > 0 && (
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width - 20}
          height={180}
          accessor="sales"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={chartConfig}
          style={styles.chart}
        />
      )}

      <ScrollView
        style={{ maxHeight: 400, marginTop: 15 }}
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {filtered.map((item) => {
          const totalVendas = item.vendas.reduce((sum, v) => sum + v.valor, 0);
          const qtdVendas = item.vendas.length;

          return (
            <View
              key={item.email}
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 20,
                marginVertical: 10,
                minHeight: 160,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text
                style={[styles.cardTitle, { fontWeight: "700", fontSize: 18 }]}
              >
                {item.nomeCompleto}
              </Text>

              <Text style={{ color: "#777", marginVertical: 6 }}>
                {t("missingLetter")}: {getMissingLetter(item.nomeCompleto)}
              </Text>

              <Text style={{ fontWeight: "600", marginBottom: 6 }}>
                {t("salesCount")}: {qtdVendas} | {t("salesTotal")}: R${" "}
                {totalVendas.toFixed(2)}
              </Text>

              {qtdVendas > 0 ? (
                <View>
                  {item.vendas.map((v, i) => (
                    <Text
                      key={i}
                      style={{ color: "#333", marginLeft: 10, marginBottom: 4 }}
                    >
                      - {formatDateBR(v.data)}: R$ {v.valor.toFixed(2)}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text style={{ fontStyle: "italic", color: "#999" }}>
                  {t("noSales")}
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.highlightsWrapper}>
        <Text style={styles.highlightsTitle}>{t("highlights")}</Text>
        <Text style={styles.highlightItem}>
          {t("topSales")}: {topSales?.nomeCompleto || "-"}
        </Text>
        <Text style={styles.highlightItem}>
          {t("highestAvg")}: {highestAvg?.nomeCompleto || "-"}
        </Text>
        <Text style={styles.highlightItem}>
          {t("mostFrequent")}: {mostFrequent?.nomeCompleto || "-"}
        </Text>
        <Text style={styles.highlightItem}>
          {t("totalSalesGeral")}: R$ {totalVendasGeral.toFixed(2)}
        </Text>
      </View>

      {chartData.labels.length > 0 && (
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 20}
          height={240}
          fromZero
          chartConfig={chartConfig}
          verticalLabelRotation={45}
          style={styles.chart}
          yAxisLabel={""}
          yAxisSuffix={""}
        />
      )}
    </ScrollView>
  );
}
