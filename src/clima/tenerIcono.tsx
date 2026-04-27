export const tenerIcono = (clima: string) => {
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