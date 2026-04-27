import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

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

        const API_KEY = 'd13bad036f70012e096e5e01f257ef89';

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`
        );

        const data = await res.json();

        setTemperatura(Math.round(data.main.temp));
        setTempMin(Math.round(data.main.temp_min));
        setTempMax(Math.round(data.main.temp_max));
        setCiudad(data.name);
        setClima(data.weather[0].main);
        setHumedad(data.main.humidity);
        setPresion(data.main.pressure);
        setViento(data.wind.speed);

        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`
        );

        const forecastData = await resForecast.json();

        const diasUnicos = forecastData.list.filter((item: any) =>
          item.dt_txt.includes('12:00:00')
        );

        setDias(diasUnicos);
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