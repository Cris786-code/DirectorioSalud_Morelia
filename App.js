// ============================================
// 📦 IMPORTACIONES
// ============================================
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CamaraScreen from "./screens/CamaraScreen";
import CercaDeTiScreen from "./screens/CercaDeTiScreen";
import DetalleScreen from "./screens/DetalleScreen";
import FavoritosEmergenciasScreen from "./screens/FavoritosEmergenciasScreen";
import InicioScreen from "./screens/InicioScreen";
import PreviewScreen from "./screens/PreviewScreen copy";

// ============================================
// ⚙️ CONFIGURACIÓN GLOBAL
// ============================================
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const { width } = Dimensions.get("window");

// ============================================
// 🎨 COMPONENTES SECUNDARIOS
// ============================================

// Pantalla 1: Historial de Visitas (donde aparecen las fotos capturadas)
function VisitasHistorialScreen({
  route,
  navigation,
  historialVisitas: propHistorial,
  setHistorialVisitas: propSetHistorial,
}) {
  // Use historial passed from App if available, otherwise use local state
  const [localHistorial, setLocalHistorial] = useState([]);
  const historialVisitas = propHistorial ?? localHistorial;
  const setHistorialVisitas = propSetHistorial ?? setLocalHistorial;

  // Soportar navegación antigua que envía params desde Preview
  useEffect(() => {
    if (route.params?.timestamp) {
      const visit = route.params;
      const exists = (historialVisitas || []).some(
        (item) => item.timestamp === visit.timestamp,
      );
      if (!exists) {
        setHistorialVisitas((prev) => [visit, ...(prev || [])]);
      }
    }
  }, [route.params]);

  return (
    <View style={styles.containerHistorial}>
      <View style={styles.headerRow}>
        <Text style={styles.tituloHistorial}>Historial de Visitas 📋</Text>
        <TouchableOpacity
          style={styles.abrirCamaraBtn}
          onPress={() => navigation.navigate("Camara")}
        >
          <Text style={styles.abrirCamaraText}>Abrir cámara</Text>
        </TouchableOpacity>
      </View>

      {historialVisitas.length === 0 ? (
        <View style={styles.centroVacio}>
          <Text style={styles.textoVacio}>No has registrado visitas hoy.</Text>
          <Text style={styles.subtextoVacio}>
            Pulsa «Abrir cámara» para tomar una foto y registrarla en el
            historial.
          </Text>
        </View>
      ) : (
        <FlatList
          data={historialVisitas}
          keyExtractor={(item) => item.timestamp.toString()}
          contentContainerStyle={styles.listaContenedor}
          renderItem={({ item }) => (
            <View style={styles.tarjetaVisita}>
              <Image
                source={{ uri: item.fotoUri }}
                style={styles.imagenCapturada}
                resizeMode="cover"
              />
              <View style={styles.infoContenedor}>
                <Text style={styles.textoFecha}>📅 {item.fecha}</Text>
                {item.lat && item.lng ? (
                  <Text style={styles.textoGps}>
                    📍 GPS: {item.lat.toFixed(5)}, {item.lng.toFixed(5)}
                  </Text>
                ) : (
                  <Text style={[styles.textoGps, { color: "#ef4444" }]}>
                    📍 Sin coordenadas GPS
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

// Pantalla 2: Navegador de Pestañas Inferior (Tab Navigation)
// Aquí se encuentran: Explorar, Cerca de ti, Visitas, Favoritos
function MainTabs({
  favoritos,
  toggleFavorito,
  historialVisitas,
  setHistorialVisitas,
}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Inicio") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "CercaDeTi") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Detalle") {
            iconName = focused ? "images" : "images-outline";
          } else if (route.name === "Captura") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (route.name === "Visitas") {
            iconName = focused ? "journal" : "journal-outline";
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
      {/* ▸ PESTAÑA 1: Explorar */}
      <Tab.Screen name="Inicio" options={{ title: "Explorar" }}>
        {(props) => (
          <InicioScreen
            {...props}
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
          />
        )}
      </Tab.Screen>

      {/* ▸ PESTAÑA 2: Mapa */}
      <Tab.Screen name="CercaDeTi" options={{ title: "Cerca de ti" }}>
        {(props) => (
          <CercaDeTiScreen
            {...props}
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
          />
        )}
      </Tab.Screen>

      {/* ▸ PESTAÑA 3: Historial de Visitas */}
      <Tab.Screen name="Visitas">
        {(props) => (
          <VisitasHistorialScreen
            {...props}
            historialVisitas={historialVisitas}
            setHistorialVisitas={setHistorialVisitas}
          />
        )}
      </Tab.Screen>

      {/* ▸ PESTAÑA 4: Favoritos */}
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
  );
}

// ============================================
// 🚀 COMPONENTE PRINCIPAL DE LA APP
// ============================================
// Aquí está todo:
// - Stack Navigator (navegación global)
// - Main (Tab Navigation)
// - Cámara, Preview, Detalles
export default function App() {
  // ---- ESTADOS GLOBALES ----
  const [favoritos, setFavoritos] = useState([]);
  const [historialVisitas, setHistorialVisitas] = useState([]);

  // ---- FUNCIONES ----
  // Agregar nueva visita al historial
  const addVisit = (visit) => {
    setHistorialVisitas((prev) => {
      const exists = prev.some((v) => v.timestamp === visit.timestamp);
      return exists ? prev : [visit, ...prev];
    });
  };

  // Agregar/quitar favoritos
  const toggleFavorito = (lugar) => {
    setFavoritos((prev) =>
      prev.some((item) => item.id === lugar.id)
        ? prev.filter((item) => item.id !== lugar.id)
        : [...prev, lugar],
    );
  };

  // ---- RENDERIZADO ----
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* SCREEN 1: Menú principal con pestañas */}
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <MainTabs
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
              historialVisitas={historialVisitas}
              setHistorialVisitas={setHistorialVisitas}
            />
          )}
        </Stack.Screen>

        {/* SCREEN 2: Pantalla de cámara (abierta desde el historial) */}
        <Stack.Screen
          name="Camara"
          component={CamaraScreen}
          options={{ headerShown: false }}
        />

        {/* SCREEN 3: Vista previa de foto antes de guardar */}
        <Stack.Screen name="Preview" options={{ headerShown: false }}>
          {(props) => <PreviewScreen {...props} addVisit={addVisit} />}
        </Stack.Screen>

        {/* SCREEN 4: Detalles del lugar seleccionado */}
        <Stack.Screen
          name="Detalle"
          options={{ title: "Detalles del Lugar", headerShown: true }}
        >
          {(props) => (
            <DetalleScreen
              {...props}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ============================================
// 🎨 ESTILOS (StyleSheet)
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  containerHistorial: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  tituloHistorial: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },
  abrirCamaraBtn: {
    backgroundColor: "#059669",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  abrirCamaraText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  listaContenedor: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  centroVacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  textoVacio: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subtextoVacio: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
  tarjetaVisita: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagenCapturada: {
    width: "100%",
    height: width * 0.5,
    backgroundColor: "#cbd5e1",
  },
  infoContenedor: {
    padding: 12,
  },
  textoFecha: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  textoGps: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
});
