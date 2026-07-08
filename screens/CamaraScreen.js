import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system/legacy";
import * as Location from "expo-location";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CamaraScreen({ navigation }) {
  const camaraRef = useRef(null);
  const [cargando, setCargando] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  // 1. Pantalla de carga inicial mientras se verifica el permiso
  if (!permission) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  // 2. Pantalla de solicitud si el usuario denegó el acceso a la cámara
  if (!permission.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.permisoEmoji}>📷</Text>
        <Text style={styles.permisoTexto}>
          Se necesita permiso de cámara para fotografiar el lugar y registrar tu
          visita.
        </Text>
        <TouchableOpacity style={styles.permisoBtn} onPress={requestPermission}>
          <Text style={styles.permisoBtnTexto}>Dar permiso de cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. Función principal para capturar multimedia y geolocalización
  const tomarFoto = async () => {
    if (!camaraRef.current || cargando) return;
    setCargando(true);

    try {
      // A. Captura la fotografía en calidad media para optimizar almacenamiento
      const foto = await camaraRef.current.takePictureAsync({ quality: 0.7 });

      // B. Asegurar directorio permanente usando el FileSystem
      const dirVisitas = FileSystem.documentDirectory + "visitas/";
      const dirInfo = await FileSystem.getInfoAsync(dirVisitas);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirVisitas, {
          intermediates: true,
        });
      }

      // C. Mover el archivo de la caché temporal a la ruta fija
      const rutaPermanente = dirVisitas + "visita_" + Date.now() + ".jpg";
      await FileSystem.copyAsync({ from: foto.uri, to: rutaPermanente });

      // D. Solicitar acceso al GPS en primer plano
      const { status } = await Location.requestForegroundPermissionsAsync();
      let lat = null,
        lng = null;

      if (status === "granted") {
        const ubicacion = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        lat = ubicacion.coords.latitude;
        lng = ubicacion.coords.longitude;
      } else {
        Alert.alert(
          "GPS no disponible",
          "La visita se guardará sin coordenadas de geolocalización.",
        );
      }

      // E. Redirigir a la vista de previsualización antes de guardar definitivamente
      navigation.navigate("Preview", {
        fotoUri: rutaPermanente,
        lat,
        lng,
        fecha: new Date().toLocaleString("es-MX"),
        timestamp: Date.now(),
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo procesar la captura. Inténtalo de nuevo.",
      );
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Vista nativa de la cámara */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        ref={camaraRef}
        facing="back"
      />

      {/* Capa contenedora de la interfaz (Overlay) */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        {/* Indicador superior */}
        <View style={styles.gpsIndicador}>
          <Text style={styles.gpsTexto}>GPS Listo</Text>
        </View>

        {/* Retícula visual guía para encuadrar el objetivo */}
        <View style={styles.reticula}>
          <View style={[styles.esquina, styles.esqTL]} />
          <View style={[styles.esquina, styles.esqTR]} />
          <View style={[styles.esquina, styles.esqBL]} />
          <View style={[styles.esquina, styles.esqBR]} />
        </View>

        {/* Panel inferior y disparador */}
        <View style={styles.botonesArea}>
          <Text style={styles.instruccion}>
            Alinea el objetivo y presiona el obturador para capturar la
            evidencia.
          </Text>

          <TouchableOpacity
            style={[styles.btnCaptura, cargando && { opacity: 0.6 }]}
            onPress={tomarFoto}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#059669" size="large" />
            ) : (
              <View style={styles.circuloInterior} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const C = 18,
  W = 3;
const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#000",
  },
  permisoEmoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  permisoTexto: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  permisoBtn: {
    backgroundColor: "#059669",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  permisoBtnTexto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  gpsIndicador: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  gpsTexto: {
    color: "#4ade80",
    fontWeight: "700",
    fontSize: 12,
  },
  reticula: {
    position: "absolute",
    top: "35%",
    left: "20%",
    width: "60%",
    height: "30%",
  },
  esquina: {
    position: "absolute",
    width: C,
    height: C,
  },
  esqTL: {
    top: 0,
    left: 0,
    borderTopWidth: W,
    borderLeftWidth: W,
    borderColor: "#fff",
  },
  esqTR: {
    top: 0,
    right: 0,
    borderTopWidth: W,
    borderRightWidth: W,
    borderColor: "#fff",
  },
  esqBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: W,
    borderLeftWidth: W,
    borderColor: "#fff",
  },
  esqBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: W,
    borderRightWidth: W,
    borderColor: "#fff",
  },
  botonesArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 44,
    paddingTop: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  instruccion: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 32,
    lineHeight: 18,
  },
  btnCaptura: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  circuloInterior: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
  },
});
