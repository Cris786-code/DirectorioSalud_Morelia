import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import DetalleScreen from "./screens/DetalleScreen";
import FavoritosEmergenciasScreen from "./screens/FavoritosEmergenciasScreen";
import InicioScreen from "./screens/InicioScreen";
function ListadoScreen() {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Listado / Resultados 📋</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (lugar) => {
    setFavoritos((prev) =>
      prev.some((item) => item.id === lugar.id)
        ? prev.filter((item) => item.id !== lugar.id)
        : [...prev, lugar],
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Configuración de íconos basados en la nueva lista de Marianita
            if (route.name === "Inicio") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Listado") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Detalle") {
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
            } else if (route.name === "Favoritos") {
              iconName = focused ? "heart" : "heart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0284c7",
          tabBarInactiveTintColor: "gray",
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#0f172a",
        })}
      >
        {/* 2. CONFIGURACIÓN DE LAS PESTAÑAS DEL MENÚ */}
        <Tab.Screen name="Inicio" options={{ title: "Explorar" }}>
          {(props) => (
            <InicioScreen
              {...props}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Listado"
          component={ListadoScreen}
          options={{ title: "Resultados" }}
        />
        <Tab.Screen
          name="Detalle"
          component={DetalleScreen}
          options={{ title: "Fotos" }}
        />

        {/* Aquí llamamos directamente a tu componente importado */}
        <Tab.Screen name="Favoritos" options={{ title: "Favoritos" }}>
          {(props) => (
            <FavoritosEmergenciasScreen
              {...props}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
});
