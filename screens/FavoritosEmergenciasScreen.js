import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LugarCard from "../components/LugarCard";

import { directorioMedico } from "../data";

export default function FavoritosEmergenciasScreen() {
  const [favoritos, setFavoritos] = useState([]);

  const llamarEmergencia = () => {
    Linking.openURL("tel:911");
  };

  const simularAgregarFavorito = () => {
    const hospitalDemo = directorioMedico[0];

    if (favoritos.some((item) => item.id === hospitalDemo.id)) {
      Alert.alert("Aviso", "El Hospital Civil ya está en tus favoritos.");
    } else {
      setFavoritos([...favoritos, hospitalDemo]);
    }
  };

  const confirmarEliminar = (id, nombre) => {
    Alert.alert(
      "Quitar de Favoritos",
      `¿Deseas eliminar el "${nombre}" de tu lista de favoritos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () =>
            setFavoritos(favoritos.filter((item) => item.id !== id)),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* SECCIÓN DE EMERGENCIAS (Siempre visible) */}
      <View style={styles.seccionEmergencia}>
        <Text style={styles.tituloSeccion}>Línea de Emergencia 🚨</Text>
        <Text style={styles.descripcionEmergencia}>
          Toca el botón para comunicarte inmediatamente con los servicios de
          emergencia de Morelia.
        </Text>
        <TouchableOpacity
          style={styles.botonEmergencia}
          onPress={llamarEmergencia}
        >
          <Ionicons name="call" size={22} color="white" />
          <Text style={styles.textoBotonEmergencia}>Llamar al 911</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separador} />

      {/* SECCIÓN DE FAVORITOS DINÁMICA */}
      <View style={styles.seccionFavoritos}>
        <Text style={styles.tituloSeccion}>Mis Hospitales Favoritos ❤️</Text>

        {favoritos.length === 0 ? (
          // --- ESTADO VACÍO: Se muestra si el usuario no tiene favoritos ---
          <View style={styles.contenedorVacio}>
            <Ionicons name="heart-dislike-outline" size={60} color="#cbd5e1" />
            <Text style={styles.textoVacio}>
              Aún no tienes favoritos guardados.
            </Text>
            <Text style={styles.subtextoVacio}>
              Explora el directorio médico de Morelia y añade tus hospitales o
              clínicas frecuentes aquí.
            </Text>

            {/* BOTÓN PROVISIONAL PARA MODO PRUEBA */}
            <TouchableOpacity
              style={styles.botonDemo}
              onPress={simularAgregarFavorito}
            >
              <Ionicons name="add-circle-outline" size={20} color="#0284c7" />
              <Text style={styles.textoBotonDemo}>
                Simular agregar favorito (Modo Prueba)
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // --- ESTADO LLENO: Renderiza las tarjetas oficiales de la maestra ---
          <FlatList
            data={favoritos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <LugarCard
                lugar={item}
                // Si el usuario presiona la tarjeta, le da la opción de borrarla
                onPress={() => confirmarEliminar(item.id, item.nombre)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  seccionEmergencia: {
    backgroundColor: "#fff1f2",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fecdd3",
    alignItems: "center",
    marginBottom: 10,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
  },
  descripcionEmergencia: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 15,
    fontSize: 14,
  },
  botonEmergencia: {
    backgroundColor: "#e11d48",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    gap: 10,
  },
  textoBotonEmergencia: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  separador: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 10,
  },
  seccionFavoritos: {
    flex: 1,
    marginTop: 5,
  },
  // Estilos del Estado Vacío
  contenedorVacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textoVacio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#64748b",
    marginTop: 15,
    textAlign: "center",
  },
  subtextoVacio: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 5,
    lineHeight: 18,
  },
  botonDemo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  textoBotonDemo: {
    color: "#0284c7",
    fontSize: 13,
    fontWeight: "600",
  },
});
