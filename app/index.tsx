import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function Home() {
  const [clima, setClima] = useState("Cargando...");
  const [temperatura, setTemperatura] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [ciudad, setCiudad] = useState("Cargando...");

  useEffect(() => {
    const obtenerClima = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const API_KEY = "d13bad036f70012e096e5e01f257ef89";

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`
      );

      const data = await res.json();

      setTemperatura(Math.round(data.main.temp));
      setTempMin(Math.round(data.main.temp_min));
      setTempMax(Math.round(data.main.temp_max));
      setCiudad(data.name);
      setClima(data.weather[0].main);
    };

    obtenerClima();
  }, []);

  const obtenerIcono = () => {
    switch (clima.toLowerCase()) {
      case "clear":
        return "sun";
      case "clouds":
        return "cloud";
      case "rain":
        return "cloud-rain";
      case "snow":
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

      <Text style={styles.minMax}>
        Min: {tempMin}° | Max: {tempMax}°
      </Text>

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
  minMax: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  descripcion: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
  },
});