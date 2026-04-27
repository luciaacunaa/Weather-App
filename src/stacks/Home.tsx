import { View, StyleSheet } from 'react-native';
import Cabecera from '../dias/header';
import ClimaPrincipal from '../clima/weatherMain';
import ClimaExtras from '../clima/climaExtras';
import { useClima } from '../api/usarClima';

export default function Home() {
  const data = useClima();

  const siguienteDia = () => {
    if (data.diaIndex < data.dias.length - 1) {
      data.setDiaIndex(data.diaIndex + 1);
    }
  };

  const anteriorDia = () => {
    if (data.diaIndex > 0) {
      data.setDiaIndex(data.diaIndex - 1);
    }
  };

  console.log(data)

  return (
    <View style={styles.container}>
      <Cabecera
        diaIndex={data.diaIndex}
        dias={data.dias}
        onNext={siguienteDia}
        onPrev={anteriorDia}
      />

      <ClimaPrincipal {...data} />

      <ClimaExtras {...data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});