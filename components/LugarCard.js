import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LugarCard({ lugar, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View style={styles.card}>
        <Image source={lugar.imagen} style={styles.imagen} />
        <Text style={styles.nombre}>{lugar.nombre}</Text>
        <View style={styles.divider} />
        <Text style={styles.descripcion}>{lugar.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagen: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderRadius: 8,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    marginBottom: 8,
  },
});
