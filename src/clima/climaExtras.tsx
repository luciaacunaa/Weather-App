import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  humedad: number | null;
  presion: number | null;
  viento: number | null;
};

export default function ClimaExtras({ humedad, presion, viento }: Props) {
  return (
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
  );
}

const styles = StyleSheet.create({
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