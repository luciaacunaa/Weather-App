import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const API_KEY = '97073801233145d8bc3174838262404';
const BASE_URL = 'http://api.weatherapi.com/v1';

const getDate = (daysOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};

export const useClima = () => {
  const [clima, setClima] = useState('Cargando...');
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [tempMin, setTempMin] = useState<number | null>(null);
  const [tempMax, setTempMax] = useState<number | null>(null);
  const [ciudad, setCiudad] = useState('Cargando...');
  const [humedad, setHumedad] = useState<number | null>(null);
  const [presion, setPresion] = useState<number | null>(null);
  const [viento, setViento] = useState<number | null>(null);
  const [dias, setDias] = useState<any[]>([]);
  const [diaIndex, setDiaIndex] = useState(1); // arranca en Hoy (índice 1)

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const coords = `${latitude},${longitude}`;

        // 3 requests en paralelo
        const [resCurrent, resAyer, resForecast] = await Promise.all([
          fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${coords}&lang=es`),
          fetch(`${BASE_URL}/history.json?key=${API_KEY}&q=${coords}&dt=${getDate(-1)}&lang=es`),
          fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${coords}&days=2&lang=es`),
        ]);

        const [currentData, ayerData, forecastData] = await Promise.all([
          resCurrent.json(),
          resAyer.json(),
          resForecast.json(),
        ]);

        // Datos del clima actual
        setTemperatura(Math.round(currentData.current.temp_c));
        setCiudad(currentData.location.name);
        setClima(currentData.current.condition.text);
        setHumedad(currentData.current.humidity);
        setPresion(currentData.current.pressure_mb);
        setViento(currentData.current.wind_kph);

        const formatearDia = (fd: any) => {
          const hourAlMediodia = fd.hour.find((h: any) =>
            h.time.includes('12:00')
          ) ?? fd.hour[0];
          return {
            date: fd.date,
            temp_c: hourAlMediodia.temp_c,
            mintemp_c: fd.day.mintemp_c,
            maxtemp_c: fd.day.maxtemp_c,
            condition: fd.day.condition,
            humidity: fd.day.avghumidity,
          };
        };

        const diaAyer = formatearDia(ayerData.forecast.forecastday[0]);

        // forecast.json days=2 devuelve [hoy, mañana]
        const diaHoy = formatearDia(forecastData.forecast.forecastday[0]);
        const diaManana = formatearDia(forecastData.forecast.forecastday[1]);

        // tempMin y tempMax de hoy (ahora disponibles via forecast)
        setTempMin(Math.round(diaHoy.mintemp_c));
        setTempMax(Math.round(diaHoy.maxtemp_c));

        // orden: [Ayer, Hoy, Mañana]
        setDias([diaAyer, diaHoy, diaManana]);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClima();
  }, []);

  return {
    clima,
    temperatura,
    tempMin,
    tempMax,
    ciudad,
    humedad,
    presion,
    viento,
    dias,
    diaIndex,
    setDiaIndex,
  };
};