import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import DetalleScreen from "./screens/DetalleScreen";
import FavoritosEmergenciasScreen from "./screens/FavoritosEmergenciasScreen";
function InicioScreen() {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Inicio / Exploración 🔍</Text>
    </View>
  );
}

function ListadoScreen() {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Listado / Resultados 📋</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
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
        <Tab.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ title: "Explorar" }}
        />
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
        <Tab.Screen
          name="Favoritos"
          component={FavoritosEmergenciasScreen}
          options={{ title: "Favoritos" }}
        />
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
