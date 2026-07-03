import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import LugarCard from '../components/LugarCard';
import lugares from '../data';

export default function InicioScreen({ navigation }) {
  // 0: Todos, 1: Públicos, 2: Privados
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const botonesFiltro = ['Todos', 'Públicos', 'Privados'];

  // Lógica para filtrar las clínicas, hospitales y farmacias
  const lugaresFiltrados = lugares.filter((item) => {
    if (selectedIndex === 1) return item.tipo === 'publico';
    if (selectedIndex === 2) return item.tipo === 'privado';
    return true; // Si es 0, regresa toda la lista
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Servicios de Salud</Text>
      <Text style={styles.subtitulo}>Morelia, Michoacán</Text>

      {/* Selector de filtros */}
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
            onPress={() => navigation.navigate('Detalle', { lugar: item })}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginTop: 20, marginLeft: 16 },
  subtitulo: { fontSize: 14, color: '#888', marginLeft: 16, marginBottom: 8 },
  filtroContainer: { paddingHorizontal: 8, marginBottom: 8 },
  buttonGroup: { height: 40, borderRadius: 8, backgroundColor: '#fff' },
  botonActivo: { backgroundColor: '#007bff' },
  textoBoton: { fontSize: 13 }
});