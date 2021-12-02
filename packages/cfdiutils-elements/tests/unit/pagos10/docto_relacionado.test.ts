import { DoctoRelacionado } from '../../../src/pagos10';

describe('Elements.Pagos10.DoctoRelacionado', () => {
  test('get element name', () => {
    const element = new DoctoRelacionado();
    expect(element.name()).toBe('pago10:DoctoRelacionado');
    expect(element.getElementName()).toBe('pago10:DoctoRelacionado');
  });
});
