import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function VisitasHistorialScreen({ route }) {
  // 1. Estado para almacenar todas las visitas/fotos que vayas tomando
  const [historialVisitas, setHistorialVisitas] = useState([]);

  // 2. Escuchar cuando la pantalla Preview nos mande una nueva foto
  useEffect(() => {
    if (route.params?.timestamp) {
      // Validamos si la visita ya existe en el estado para no duplicarla al redibujar
      const yaExiste = historialVisitas.some(
        (item) => item.timestamp === route.params.timestamp,
      );

      if (!yaExiste) {
        // Agregamos la nueva foto al inicio de la lista
        setHistorialVisitas((prev) => [route.params, ...prev]);
      }
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial de Visitas 📋</Text>

      {historialVisitas.length === 0 ? (
        <View style={styles.centroVacio}>
          <Text style={styles.textoVacio}>No has registrado visitas hoy.</Text>
          <Text style={styles.subtextoVacio}>
            Toca la pestaña de Cámara para empezar.
          </Text>
        </View>
      ) : (
        /* 3. Lista para renderizar las tarjetas con las fotos reales */
        <FlatList
          data={historialVisitas}
          keyExtractor={(item) => item.timestamp.toString()}
          contentContainerStyle={styles.listaContenedor}
          renderItem={({ item }) => (
            <View style={styles.tarjetaVisita}>
              {/* AQUÍ SE MUESTRA TU FOTO CAPTURADA */}
              <Image
                source={{ uri: item.fotoUri }}
                style={styles.imagenCapturada}
                resizeMode="cover"
              />

              <View style={styles.infoContenedor}>
                <Text style={styles.textoFecha}>📅 {item.fecha}</Text>
                {item.lat && item.lng ? (
                  <Text style={styles.textoGps}>
                    📍 Ubicación: {item.lat.toFixed(5)}, {item.lng.toFixed(5)}
                  </Text>
                ) : (
                  <Text style={[styles.textoGps, { color: "#ef4444" }]}>
                    📍 Sin datos GPS
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 15,
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
    overflow: "hidden", // Para que la imagen respete las esquinas redondeadas
    borderWidth: 1,
    borderColor: "#e2e8f0",
    elevation: 3, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagenCapturada: {
    width: "100%",
    height: width * 0.5, // La imagen ocupará la mitad del ancho de la pantalla de alto
    backgroundColor: "#cbd5e1", // Fondo gris por si tarda en cargar
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
