import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const API_KEY = '97073801233145d8bc3174838262404';
const BASE_URL = 'http://api.weatherapi.com/v1';

const getYesterdayDate = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
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
  const [diaIndex, setDiaIndex] = useState(0);

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const coords = `${latitude},${longitude}`;

        const resCurrent = await fetch(
          `${BASE_URL}/current.json?key=${API_KEY}&q=${coords}&lang=es`
        );
        const currentData = await resCurrent.json();

        setTemperatura(Math.round(currentData.current.temp_c));
        setCiudad(currentData.location.name);
        setClima(currentData.current.condition.text);
        setHumedad(currentData.current.humidity);
        setPresion(currentData.current.pressure_mb);
        setViento(currentData.current.wind_kph);

        const ayer = getYesterdayDate();
        const resHistory = await fetch(
          `${BASE_URL}/history.json?key=${API_KEY}&q=${coords}&dt=${ayer}&lang=es`
        );
        const historyData = await resHistory.json();

        const dayData = historyData.forecast.forecastday[0].day;
        setTempMin(Math.round(dayData.mintemp_c));
        setTempMax(Math.round(dayData.maxtemp_c));

        const diasFormateados = historyData.forecast.forecastday.map((fd: any) => {
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
        });

        setDias(diasFormateados);
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