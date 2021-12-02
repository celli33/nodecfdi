import { Traslado } from '../../../src/pagos10';

describe('Elements.Pagos10.Traslado', () => {
  test('get element name', () => {
    const element = new Traslado();
    expect(element.name()).toBe('pago10:Traslado');
    expect(element.getElementName()).toBe('pago10:Traslado');
  });
});
