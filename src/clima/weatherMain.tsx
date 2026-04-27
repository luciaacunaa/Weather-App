import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {tenerIcono} from './tenerIcono';

type Props = {
  ciudad: string;
  clima: string;
  temperatura: number | null;
  tempMin: number | null;
  tempMax: number | null;
  diaIndex: number;
  dias: any[];
};

export default function ClimaPrincipal({
  ciudad,
  clima,
  temperatura,
  tempMin,
  tempMax,
  diaIndex,
  dias,
}: Props) {
  const diaActual = dias[diaIndex];

  return (
    <View style={styles.content}>
      <Text style={styles.ciudad}>{ciudad}</Text>

      <Feather name={tenerIcono(clima)} size={140} color="#000" />

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
  );
}

const styles = StyleSheet.create({
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
});