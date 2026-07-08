import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LugarCard({
  lugar,
  onPress,
  favorito = false,
  onFavoritePress,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.imagenContainer}>
        <Image source={lugar.imagen} style={styles.imagen} />
        <TouchableOpacity
          style={styles.botonFavorito}
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={favorito ? "heart" : "heart-outline"}
            size={18}
            color={favorito ? "#e11d48" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contenido}>
        <Text style={styles.categoria}>{lugar.categoria.toUpperCase()}</Text>
        <Text style={styles.titulo}>{lugar.nombre}</Text>

        <View style={styles.divisor} />

        <Text style={styles.descripcion} numberOfLines={2}>
          {lugar.descripcion}
        </Text>

        <View style={styles.pieTarjeta}>
          {/* Badge de tipo */}
          <View
            style={[
              styles.badge,
              lugar.tipo === "publico"
                ? styles.badgePublico
                : styles.badgePrivado,
            ]}
          >
            <Text style={styles.badgeText}>
              {lugar.tipo === "publico" ? "Público" : "Privado"}
            </Text>
          </View>

          {/* ¡NUEVO BOTÓN DE DETALLES! */}
          <TouchableOpacity
            style={styles.botonDetalle}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.textoBotonDetalle}>Ver detalles ➔</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagenContainer: { position: "relative" },
  imagen: { width: "100%", height: 160, resizeMode: "cover" },
  botonFavorito: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    borderRadius: 999,
    padding: 8,
  },
  contenido: { padding: 16 },
  categoria: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0284c7",
    marginBottom: 4,
  },
  titulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  divisor: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 8 },
  descripcion: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
    marginBottom: 14,
  },
  pieTarjeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgePublico: { backgroundColor: "#d4edda" },
  badgePrivado: { backgroundColor: "#cce5ff" },
  badgeText: { fontSize: 11, fontWeight: "600", color: "#1e293b" },
  botonDetalle: {
    backgroundColor: "#0284c7",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
  },
  textoBotonDetalle: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
