import { Ionicons } from "@expo/vector-icons";
import { Card, Text } from "@rneui/themed";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function LugarCard({
  lugar,
  onPress,
  favorito = false,
  onFavoritePress,
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Card containerStyle={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={lugar.imagen} style={styles.imagen} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(event) => {
              event.stopPropagation?.();
              onFavoritePress?.();
            }}
          >
            <Ionicons
              name={favorito ? "heart" : "heart-outline"}
              size={22}
              color={favorito ? "#e11d48" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contenido}>
          <Text style={styles.categoria}>{lugar.categoria.toUpperCase()}</Text>
          <Card.Title style={styles.titulo}>{lugar.nombre}</Card.Title>
          <Card.Divider />

          <Text style={styles.descripcion}>{lugar.descripcion}</Text>

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
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 0, overflow: "hidden", marginBottom: 16 },
  imageWrapper: { position: "relative" },
  imagen: { width: "100%", height: 180, resizeMode: "cover" },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  contenido: { padding: 12 },
  categoria: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 4,
  },
  titulo: { textAlign: "left", fontSize: 18, marginBottom: 4 },
  descripcion: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    marginBottom: 12,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgePublico: { backgroundColor: "#d4edda" },
  badgePrivado: { backgroundColor: "#cce5ff" },
  badgeText: { fontSize: 11, fontWeight: "600", color: "#333" },
});
