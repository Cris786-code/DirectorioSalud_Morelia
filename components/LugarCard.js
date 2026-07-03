import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Card, Text } from '@rneui/themed';

export default function LugarCard({ lugar, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Card containerStyle={styles.card}>
        <Image source={lugar.imagen} style={styles.imagen} />
        
        <View style={styles.contenido}>
          <Text style={styles.categoria}>{lugar.categoria.toUpperCase()}</Text>
          <Card.Title style={styles.titulo}>{lugar.nombre}</Card.Title>
          <Card.Divider />
          
          <Text style={styles.descripcion}>{lugar.descripcion}</Text>
          
          <View style={[styles.badge, lugar.tipo === 'publico' ? styles.badgePublico : styles.badgePrivado]}>
            <Text style={styles.badgeText}>{lugar.tipo === 'publico' ? 'Público' : 'Privado'}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 0, overflow: 'hidden', marginBottom: 16 },
  imagen: { width: '100%', height: 180, resizeMode: 'cover' },
  contenido: { padding: 12 },
  categoria: { fontSize: 11, fontWeight: 'bold', color: '#007bff', marginBottom: 4 },
  titulo: { textAlign: 'left', fontSize: 18, marginBottom: 4 },
  descripcion: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 12 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgePublico: { backgroundColor: '#d4edda' },
  badgePrivado: { backgroundColor: '#cce5ff' },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#333' }
});