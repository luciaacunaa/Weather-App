import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function Home() {
  const [clima, setClima] = useState('Cargando...');
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [tempMin, setTempMin] = useState<number | null>(null);
  const [tempMax, setTempMax] = useState<number | null>(null);
  const [ciudad, setCiudad] = useState('Cargando...');

  const [humedad, setHumedad] = useState<number | null>(null);
  const [presion, setPresion] = useState<number | null>(null);
  const [viento, setViento] = useState<number | null>(null);

  const [dias, setDias] = useState<any[]>([]);
  const [diaIndex, setDiaIndex] = useState(0);

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const API_KEY = 'd13bad036f70012e096e5e01f257ef89';

        // 🔹 CLIMA ACTUAL
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`
        );

        const data = await res.json();

        if (!data.main) {
          console.log('Error clima:', data);
          return;
        }

        setTemperatura(Math.round(data.main.temp));
        setTempMin(Math.round(data.main.temp_min));
        setTempMax(Math.round(data.main.temp_max));
        setCiudad(data.name);
        setClima(data.weather[0].main);

        setHumedad(data.main.humidity);
        setPresion(data.main.pressure);
        setViento(data.wind.speed);

        // 🔹 FORECAST
        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`
        );

        const forecastData = await resForecast.json();

        if (!forecastData.list) {
          console.log('Error forecast:', forecastData);
          return;
        }

        const diasUnicos = forecastData.list.filter((item: any) =>
          item.dt_txt.includes('12:00:00')
        );

        setDias(diasUnicos);
      } catch (error) {
        console.log('ERROR:', error);
      }
    };

    obtenerClima();
  }, []);

  const obtenerIcono = () => {
    switch (clima.toLowerCase()) {
      case 'clear':
        return 'sun';
      case 'clouds':
        return 'cloud';
      case 'rain':
        return 'cloud-rain';
      case 'snow':
        return 'cloud-snow';
      default:
        return 'sun';
    }
  };

  const siguienteDia = () => {
    if (diaIndex < dias.length - 1) setDiaIndex(diaIndex + 1);
  };

  const anteriorDia = () => {
    if (diaIndex > 0) setDiaIndex(diaIndex - 1);
  };

  const diaActual = dias[diaIndex];

  const formatearFecha = (fecha: Date) => {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <View style={styles.container}>
      {/* 🔝 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={anteriorDia}>
          <Text style={styles.btn}>◀</Text>
        </TouchableOpacity>

        <Text style={styles.fecha}>
          {diaIndex === 0
            ? formatearFecha(new Date())
            : diaActual
              ? formatearFecha(new Date(diaActual.dt_txt))
              : '...'}
        </Text>

        <TouchableOpacity onPress={siguienteDia}>
          <Text style={styles.btn}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* 🌍 CONTENIDO */}
      <View style={styles.content}>
        <Text style={styles.ciudad}>{ciudad}</Text>

        {/* 🔥 ICONO GRANDE */}
        <Feather name={obtenerIcono()} size={140} color="#000" />

        <Text style={styles.temp}>
          {diaIndex === 0
            ? temperatura !== null
              ? `${temperatura}°`
              : '...'
            : diaActual
              ? `${Math.round(diaActual.main.temp)}°`
              : '...'}
        </Text>

        <Text style={styles.minMax}>
          Min: {tempMin ?? '...'}° | Max: {tempMax ?? '...'}°
        </Text>

        <Text style={styles.descripcion}>{clima}</Text>
      </View>

      {/* 🔻 EXTRAS */}
      <View style={styles.bottom}>
        <View style={styles.extraRow}>
          <Feather name="droplet" size={18} color="#000" />
          <Text style={styles.extraText}>Humedad: {humedad ?? '...'}%</Text>
        </View>

        <View style={styles.extraRow}>
          <Feather name="activity" size={18} color="#000" />
          <Text style={styles.extraText}>Presión: {presion ?? '...'} hPa</Text>
        </View>

        <View style={styles.extraRow}>
          <Feather name="wind" size={18} color="#000" />
          <Text style={styles.extraText}>Viento: {viento ?? '...'} m/s</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },

  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  fecha: {
    fontSize: 16,
    fontWeight: '600',
  },

  btn: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  // 🔥 MÁS PROTAGONISMO AL CENTRO
  content: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ciudad: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },

  // 🔥 ICONO MÁS GRANDE (espacio visual)
  temp: {
    fontSize: 90,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  minMax: {
    fontSize: 16,
    color: '#777',
  },

  descripcion: {
    fontSize: 18,
    marginTop: 5,
  },

  bottom: {
    alignItems: 'center',
    marginBottom: 40,
  },

  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },

  extraText: {
    fontSize: 14,
  },
});
