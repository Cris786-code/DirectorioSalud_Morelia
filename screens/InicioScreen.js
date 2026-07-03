import { ButtonGroup } from "@rneui/themed";
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import LugarCard from "../components/LugarCard";
import lugares from "../data";

export default function InicioScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favoritos, setFavoritos] = useState([]);
  const botonesFiltro = ["Todos", "Públicos", "Privados"];

  const toggleFavorito = (lugar) => {
    setFavoritos((prev) =>
      prev.some((item) => item.id === lugar.id)
        ? prev.filter((item) => item.id !== lugar.id)
        : [...prev, lugar],
    );
  };

  const isFavorito = (item) => favoritos.some((fav) => fav.id === item.id);

  const lugaresFiltrados = lugares.filter((item) => {
    if (selectedIndex === 1) return item.tipo === "publico";
    if (selectedIndex === 2) return item.tipo === "privado";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Servicios de Salud</Text>
      <Text style={styles.subtitulo}>
        Morelia, Michoacán
        {favoritos.length > 0 ? ` · ${favoritos.length} favoritos` : ""}
      </Text>

      <View style={styles.filtroContainer}>
        <ButtonGroup
          buttons={botonesFiltro}
          selectedIndex={selectedIndex}
          onPress={(value) => setSelectedIndex(value)}
          containerStyle={styles.buttonGroup}
          selectedButtonStyle={styles.botonActivo}
          textStyle={styles.textoBoton}
        />
      </View>

      <FlatList
        data={lugaresFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LugarCard
            lugar={item}
            favorito={isFavorito(item)}
            onFavoritePress={() => toggleFavorito(item)}
            onPress={() => navigation.navigate("Detalle", { lugar: item })}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  titulo: { fontSize: 24, fontWeight: "bold", marginTop: 20, marginLeft: 16 },
  subtitulo: { fontSize: 14, color: "#888", marginLeft: 16, marginBottom: 8 },
  filtroContainer: { paddingHorizontal: 8, marginBottom: 8 },
  buttonGroup: { height: 40, borderRadius: 8, backgroundColor: "#fff" },
  botonActivo: { backgroundColor: "#007bff" },
  textoBoton: { fontSize: 13 },
});
