import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen({ route, navigation, addVisit }) {
  // Recibimos los parámetros enviados desde la cámara
  const { fotoUri, lat, lng, fecha, timestamp } = route.params || {};

  const confirmarCaptura = () => {
    // Si se proporcionó addVisit (desde App), lo usamos para almacenar la visita
    if (typeof addVisit === "function") {
      addVisit({ fotoUri, lat, lng, fecha, timestamp });
      // Navegación al Stack 'Main' y seleccionar pestaña 'Visitas'
      navigation.navigate("Main", { screen: "Visitas" });
      return;
    }

    // Fallback: navegación antigua
    navigation.navigate("Main", {
      screen: "Visitas",
      params: {
        fotoUri: fotoUri,
        lat,
        lng,
        fecha,
        timestamp,
      },
    });
  };

  const descartarCaptura = () => {
    // Si no le gustó, regresa a la cámara para tomar otra
    navigation.goBack();
  };

  return (
    <View style={styles.contenedor}>
      {/* Imagen capturada a pantalla completa */}
      <Image
        source={{ uri: fotoUri }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      {/* Capa superior para los datos de geolocalización (Opcional) */}
      {lat && lng && (
        <View style={styles.capaUbicacion}>
          <Text style={styles.textoUbicacion}>
            📍 Lat: {lat.toFixed(5)} | Lng: {lng.toFixed(5)}
          </Text>
        </View>
      )}

      {/* Botones de acción inferiores */}
      <View style={styles.contenedorBotones}>
        <TouchableOpacity
          style={[styles.boton, styles.btnDescartar]}
          onPress={descartarCaptura}
        >
          <Text style={styles.textoBoton}>Repetir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, styles.btnConfirmar]}
          onPress={confirmarCaptura}
        >
          <Text style={styles.textoBoton}>Usar Foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#000",
  },
  capaUbicacion: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  textoUbicacion: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  contenedorBotones: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 44,
    paddingTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  boton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 140,
    alignItems: "center",
  },
  btnDescartar: {
    backgroundColor: "#ef4444", // Rojo
  },
  btnConfirmar: {
    backgroundColor: "#059669", // El mismo verde esmeralda de tu app
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
