import { formatearFecha } from '../src/dias/formatearFecha';

describe('formatearFecha', () => {

  it('formatea una fecha con día y mes de dos dígitos', () => {
    expect(formatearFecha(new Date(2026, 9, 25))).toBe('25/10');
  });

  it('agrega el cero a la izquierda cuando el día es menor a 10', () => {
    expect(formatearFecha(new Date(2026, 0, 5))).toBe('05/01');
  });

  it('agrega el cero a la izquierda cuando el mes es menor a 10', () => {
    expect(formatearFecha(new Date(2026, 2, 15))).toBe('15/03');
  });

  it('formatea correctamente el 1 de enero', () => {
    expect(formatearFecha(new Date(2026, 0, 1))).toBe('01/01');
  });

  it('formatea correctamente el 31 de diciembre', () => {
    expect(formatearFecha(new Date(2026, 11, 31))).toBe('31/12');
  });

  it('devuelve el formato DD/MM (no MM/DD)', () => {
    // Si fuera MM/DD devolvería '03/07', con DD/MM es '07/03'
    expect(formatearFecha(new Date(2026, 2, 7))).toBe('07/03');
  });

});