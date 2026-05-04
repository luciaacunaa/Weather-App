export const tenerIcono = (clima: string) => {
  const c = clima.toLowerCase();
  if (c.includes('sun') || c.includes('clear')) return 'sun';
  if (c.includes('rain') || c.includes('drizzle')) return 'cloud-rain';
  if (c.includes('snow') || c.includes('blizzard')) return 'cloud-snow';
  if (c.includes('cloud') || c.includes('overcast')) return 'cloud';
  return 'sun';
};