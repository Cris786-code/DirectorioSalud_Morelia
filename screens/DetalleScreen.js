import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetalleScreen({
  route,
  favoritos = [],
  toggleFavorito,
}) {
  const { lugar = null } = route?.params || {};

  if (!lugar) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Selecciona un lugar para ver los detalles
        </Text>
      </View>
    );
  }

  // Función para abrir mapas buscando por el nombre y dirección reales de tu data
  const abrirMapa = () => {
    const query = encodeURIComponent(`${lugar.nombre}, Morelia, Michoacán`);

    const esquema = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
    });

    Linking.openURL(esquema).catch((err) =>
      console.error("No se pudo abrir la aplicación de mapas:", err),
    );
  };

  // NUEVA FUNCIÓN: Permite realizar una llamada telefónica directa al presionar el número
  const hacerLlamada = () => {
    if (lugar.telefono) {
      Linking.openURL(`tel:${lugar.telefono}`).catch((err) =>
        console.error("No se pudo realizar la llamada:", err),
      );
    }
  };

  const esFavorito = favoritos.some((fav) => fav.id === lugar.id);

  const manejarFavorito = () => {
    if (toggleFavorito) {
      toggleFavorito(lugar);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. Foto del lugar */}
      <Image
        source={{
          uri: lugar.imagen?.uri || "https://via.placeholder.com/400x250",
        }}
        style={styles.imagen}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        {/* Nombre del Establecimiento */}
        <Text style={styles.nombre}>{lugar.nombre}</Text>

        {/* Categoría */}
        <Text style={styles.categoria}>🏥 {lugar.categoria}</Text>

        <TouchableOpacity
          style={[
            styles.botonFavorito,
            esFavorito && styles.botonFavoritoActivo,
          ]}
          onPress={manejarFavorito}
        >
          <Ionicons
            name={esFavorito ? "heart" : "heart-outline"}
            size={18}
            color={esFavorito ? "#fff" : "#e11d48"}
          />
          <Text
            style={[
              styles.textoBotonFavorito,
              esFavorito && styles.textoBotonFavoritoActivo,
            ]}
          >
            {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* 2. Descripción de servicios */}
        <Text style={styles.seccionTitulo}>Descripción de Servicios</Text>
        <Text style={styles.descripcion}>{lugar.descripcion}</Text>

        {/* Dirección física */}
        {lugar.direccion && (
          <View style={styles.contactoContainer}>
            <Text style={styles.seccionTituloSub}>Dirección:</Text>
            <Text style={styles.infoTexto}>📍 {lugar.direccion}</Text>
          </View>
        )}

        {/* Teléfono de contacto interactivo */}
        {lugar.telefono && (
          <View style={styles.contactoContainer}>
            <Text style={styles.seccionTituloSub}>Contacto:</Text>
            <TouchableOpacity onPress={hacerLlamada}>
              <Text style={[styles.infoTexto, styles.textoTelefono]}>
                📞 {lugar.telefono}{" "}
                <Text style={styles.miniLink}>(Toca para llamar)</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.divisor} />

        {/* NUEVA SECCIÓN: MAPA VISUAL INTERACTIVO */}
        <Text style={styles.seccionTitulo}>Ubicación en el mapa</Text>
        <Text style={styles.subtituloMapa}>
          Toca el mapa para abrir la ruta de navegación en tu GPS:
        </Text>

        <TouchableOpacity style={styles.contenedorMapa} onPress={abrirMapa}>
          <Image
            source={{
              uri: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-101.1924,19.7028,14,0/600x250?access_token=mock`,
            }} // Simulación estética de mapa urbano
            defaultSource={{
              uri: "https://via.placeholder.com/600x250.png?text=Cargando+Mapa...",
            }}
            style={styles.mapaImagen}
          />
          <View style={styles.marcadorFlotante}>
            <Text style={styles.textoMarcador}>📍 Ver ruta en GPS</Text>
          </View>
        </TouchableOpacity>

        {/* 3. Botón de acción principal */}
        <TouchableOpacity style={styles.botonLlegar} onPress={abrirMapa}>
          <Text style={styles.textoBoton}>🗺️ ¿Cómo llegar? (Abrir Mapa)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  imagen: {
    width: "100%",
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  categoria: {
    fontSize: 15,
    color: "#0284c7",
    fontWeight: "600",
    marginBottom: 10,
  },
  botonFavorito: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#fecdd3",
    marginBottom: 12,
    backgroundColor: "#fff1f2",
  },
  botonFavoritoActivo: {
    backgroundColor: "#e11d48",
    borderColor: "#e11d48",
  },
  textoBotonFavorito: {
    color: "#be123c",
    fontWeight: "600",
    fontSize: 13,
  },
  textoBotonFavoritoActivo: {
    color: "#fff",
  },
  divisor: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 15,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
  },
  seccionTituloSub: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  subtituloMapa: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 12,
  },
  descripcion: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 20,
  },
  contactoContainer: {
    marginBottom: 16,
  },
  infoTexto: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 20,
  },
  textoTelefono: {
    color: "#0284c7",
    fontWeight: "600",
  },
  miniLink: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "normal",
  },
  // NUEVOS ESTILOS PARA EL MAPA VISUAL
  contenedorMapa: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#e2e8f0",
    position: "relative",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 10,
  },
  mapaImagen: {
    width: "100%",
    height: "100%",
    opacity: 0.85,
  },
  marcadorFlotante: {
    position: "absolute",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "center",
    top: "40%",
  },
  textoMarcador: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  botonLlegar: {
    backgroundColor: "#10b981",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textoBoton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
