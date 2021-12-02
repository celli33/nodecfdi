import { Retencion } from '../../../src/pagos10';

describe('Elements.Pagos10.Retencion', () => {
  test('get element name', () => {
    const element = new Retencion();
    expect(element.name()).toBe('pago10:Retencion');
    expect(element.getElementName()).toBe('pago10:Retencion');
  });
});
