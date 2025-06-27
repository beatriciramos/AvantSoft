import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Navbar from "@components/Navbar";
import DashboardScreen from "@screens/DashboardScreen";
import SalesScreen from "@screens/SalesScreen";
import UsersScreen from "@screens/UsersScreen";

const Stack = createStackNavigator();

export default function MainApp({ onLogout }: any) {
  const handleLogout = () => {
    onLogout(); // Isso vai alterar o estado no App.tsx e voltar para Login
  };
  return (
    <Stack.Navigator
      screenOptions={{
        header: (onm) => <Navbar onLogout={onLogout} />,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="Users" component={UsersScreen} />
    </Stack.Navigator>
  );
}
