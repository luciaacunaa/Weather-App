import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatearFecha } from './formatearFecha';

type Props = {
  diaIndex: number;
  dias: any[];
  onNext: () => void;
  onPrev: () => void;
};

export default function Cabecera({
  diaIndex,
  dias,
  onNext,
  onPrev,
}: Props) {
  const diaActual = dias[diaIndex];

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPrev}>
        <Text style={styles.btn}>◀</Text>
      </TouchableOpacity>

      <Text style={styles.fecha}>
        {diaIndex === 0
          ? formatearFecha(new Date())
          : diaActual
            ? formatearFecha(new Date(diaActual.dt_txt))
            : '...'}
      </Text>

      <TouchableOpacity onPress={onNext}>
        <Text style={styles.btn}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});