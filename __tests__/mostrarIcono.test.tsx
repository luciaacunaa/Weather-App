import { tenerIcono } from '../src/clima/tenerIcono';

describe('tenerIcono', () => {
  //Sol
  describe('icono de sol', () => {
    it('devuelve "sun" para "Sunny"', () => {
      expect(tenerIcono('Sunny')).toBe('sun');
    });

    it('devuelve "sun" para "sunny" (minúsculas)', () => {
      expect(tenerIcono('sunny')).toBe('sun');
    });

    it('devuelve "sun" para "Clear sky"', () => {
      expect(tenerIcono('Clear sky')).toBe('sun');
    });

    it('devuelve "sun" para "CLEAR" (mayúsculas)', () => {
      expect(tenerIcono('CLEAR')).toBe('sun');
    });
  });

  describe('icono de lluvia', () => {
    it('devuelve "cloud-rain" para "Rainy"', () => {
      expect(tenerIcono('Rainy')).toBe('cloud-rain');
    });

    it('devuelve "cloud-rain" para "heavy rain"', () => {
      expect(tenerIcono('heavy rain')).toBe('cloud-rain');
    });

    it('devuelve "cloud-rain" para "Drizzle"', () => {
      expect(tenerIcono('Drizzle')).toBe('cloud-rain');
    });

    it('devuelve "cloud-rain" para "light drizzle"', () => {
      expect(tenerIcono('light drizzle')).toBe('cloud-rain');
    });
  });

  describe('icono de nieve', () => {
    it('devuelve "cloud-snow" para "Snow"', () => {
      expect(tenerIcono('Snow')).toBe('cloud-snow');
    });

    it('devuelve "cloud-snow" para "heavy snowfall"', () => {
      expect(tenerIcono('heavy snowfall')).toBe('cloud-snow');
    });

    it('devuelve "cloud-snow" para "Blizzard"', () => {
      expect(tenerIcono('Blizzard')).toBe('cloud-snow');
    });

    it('devuelve "cloud-snow" para "blizzard conditions"', () => {
      expect(tenerIcono('blizzard conditions')).toBe('cloud-snow');
    });
  });

  describe('icono de nube', () => {
    it('devuelve "cloud" para "Cloudy"', () => {
      expect(tenerIcono('Cloudy')).toBe('cloud');
    });

    it('devuelve "cloud" para "partly cloudy"', () => {
      expect(tenerIcono('partly cloudy')).toBe('cloud');
    });

    it('devuelve "cloud" para "Overcast"', () => {
      expect(tenerIcono('Overcast')).toBe('cloud');
    });

    it('devuelve "cloud" para "overcast skies"', () => {
      expect(tenerIcono('overcast skies')).toBe('cloud');
    });
  });

  describe('icono por defecto', () => {
    it('devuelve "sun" para un clima desconocido', () => {
      expect(tenerIcono('tornado')).toBe('sun');
    });

    it('devuelve "sun" para cadena vacía', () => {
      expect(tenerIcono('')).toBe('sun');
    });

    it('devuelve "sun" para "windy"', () => {
      expect(tenerIcono('windy')).toBe('sun');
    });
  });
});