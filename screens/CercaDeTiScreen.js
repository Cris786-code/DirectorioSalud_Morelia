import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import establecimientos from "../data";

export default function CercaDeTiScreen({ navigation }) {
  const regionMorelia = {
    latitude: 19.7025,
    longitude: -101.1924,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };

  const lugaresConCoordenadas = establecimientos.filter(
    (lugar) => lugar.coordenadas?.latitude && lugar.coordenadas?.longitude,
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={regionMorelia}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {lugaresConCoordenadas.map((lugar) => (
          <Marker
            key={lugar.id}
            coordinate={lugar.coordenadas}
            pinColor={lugar.tipo === "publico" ? "#10b981" : "#0284c7"}
          >
            <Callout
              tooltip={false}
              onPress={() => navigation.navigate("Detalle", { lugar })}
            >
              <View style={styles.calloutContainer}>
                {lugar.imagen?.uri ? (
                  <Image
                    source={{ uri: lugar.imagen.uri }}
                    style={styles.calloutImage}
                    resizeMode="cover"
                  />
                ) : null}
                <Text style={styles.calloutTitle}>{lugar.nombre}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  calloutContainer: {
    padding: 6,
    width: 220,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
  },
  calloutImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
});
