import React from "react";
import { I18nextProvider } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import i18n from "src/i18n";
import Navbar from "@components/Navbar";
import LoginScreen from "@screens/LoginScreen";
import DashboardScreen from "@screens/DashboardScreen";
import SalesScreen from "@screens/SalesScreen";
import UsersScreen from "@screens/UsersScreen";
import MainApp from "@screens/MainApp";
import { ClienteProvider } from "src/contexts/ClientContext";

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <I18nextProvider i18n={i18n}>
      <ClienteProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
              <Stack.Screen name="Login">
                {(props) => (
                  <LoginScreen
                    {...props}
                    onLogin={() => setIsAuthenticated(true)}
                  />
                )}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="Main">
                {(props) => (
                  <MainApp
                    {...props}
                    onLogout={() => setIsAuthenticated(false)}
                  />
                )}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ClienteProvider>
    </I18nextProvider>
  );
}
