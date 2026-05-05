import { renderHook, waitFor, act } from '@testing-library/react-native';
import * as Location from 'expo-location';
import { useClima } from '../src/ubicacion/usaUbicacion';

jest.mock('expo-location');
const mockLocation = Location as jest.Mocked<typeof Location>;

const mockCurrentData = (ciudad: string) => ({
  current: {
    temp_c: 20,
    condition: { text: 'Sunny' },
    humidity: 50,
    pressure_mb: 1010,
    wind_kph: 10,
  },
  location: { name: ciudad },
});

const mockHistoryData = {
  forecast: {
    forecastday: [
      {
        date: '2026-05-04',
        day: { mintemp_c: 10, maxtemp_c: 22, condition: { text: 'Sunny' }, avghumidity: 55 },
        hour: [{ time: '2026-05-04 12:00', temp_c: 18 }],
      },
    ],
  },
};

const setupMocks = (ciudad: string, coords = { latitude: -34.6, longitude: -58.38 }) => {
  mockLocation.requestForegroundPermissionsAsync.mockResolvedValue({
    status: Location.PermissionStatus.GRANTED,
    expires: 'never',
    granted: true,
    canAskAgain: true,
  });

  mockLocation.getCurrentPositionAsync.mockResolvedValue({
    coords: { ...coords, altitude: null, accuracy: 5, altitudeAccuracy: null, heading: null, speed: null },
    timestamp: Date.now(),
  });

  let callCount = 0;
  global.fetch = jest.fn(() => {
    const responses = [mockCurrentData(ciudad), mockHistoryData];
    return Promise.resolve({
      json: () => Promise.resolve(responses[callCount++ % responses.length]),
    } as Response);
  });
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useClima — ubicación (ciudad)', () => {

  it('muestra "Cargando..." antes de recibir la ubicación', () => {
    setupMocks('Buenos Aires');
    const { result } = renderHook(() => useClima());
    expect(result.current.ciudad).toBe('Cargando...');
  });

  it('muestra el nombre de la ciudad devuelto por la API', async () => {
    setupMocks('Buenos Aires');
    const { result } = renderHook(() => useClima());
    await waitFor(() => expect(result.current.ciudad).toBe('Buenos Aires'));
  });

  it('muestra otra ciudad si la API devuelve otra ubicación', async () => {
    setupMocks('Rosario');
    const { result } = renderHook(() => useClima());
    await waitFor(() => expect(result.current.ciudad).toBe('Rosario'));
  });

  it('no muestra ciudad si los permisos son denegados', async () => {
    mockLocation.requestForegroundPermissionsAsync.mockResolvedValue({
      status: Location.PermissionStatus.DENIED,
      expires: 'never',
      granted: false,
      canAskAgain: true,
    });
    mockLocation.getCurrentPositionAsync.mockResolvedValue({
      coords: { latitude: -34.6, longitude: -58.38, altitude: null, accuracy: 5, altitudeAccuracy: null, heading: null, speed: null },
      timestamp: Date.now(),
    });
    global.fetch = jest.fn();

    const { result } = renderHook(() => useClima());

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(result.current.ciudad).toBe('Cargando...');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('usa las coordenadas del dispositivo para pedir la ciudad', async () => {
    setupMocks('Córdoba', { latitude: -31.42, longitude: -64.18 });
    renderHook(() => useClima());

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const primeraUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(primeraUrl).toContain('-31.42,-64.18');
  });

  it('no muestra ciudad si el fetch falla', async () => {
    setupMocks('Buenos Aires');
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const { result } = renderHook(() => useClima());

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(result.current.ciudad).toBe('Cargando...');
  });

});