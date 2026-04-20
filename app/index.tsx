import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function Home() {
  // 🔹 Estado del clima (podés cambiarlo para probar)
  const [clima, setClima] = useState("Soleado");

  const temperatura = 24;
  const ciudad = "Buenos Aires";

  // 🔹 Función que devuelve el ícono según el clima
  const obtenerIcono = () => {
    switch (clima.toLowerCase()) {
      case "soleado":
        return "sun";
      case "nublado":
        return "cloud";
      case "lluvia":
        return "cloud-rain";
      case "nieve":
        return "cloud-snow";
      default:
        return "sun";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.ciudad}>{ciudad}</Text>

      <Feather name={obtenerIcono()} size={80} color="#000" />

      <Text style={styles.temp}>{temperatura}°</Text>

      <Text style={styles.descripcion}>{clima}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  ciudad: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  temp: {
    fontSize: 64,
    fontWeight: "bold",
    marginTop: 10,
  },
  descripcion: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
  },
});