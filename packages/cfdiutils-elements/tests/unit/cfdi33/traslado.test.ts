import { Traslado } from '../../../src/cfdi33';

describe('Elements.Cfdi33.Traslado', () => {
  test('get element name', () => {
    const element = new Traslado();
    expect(element.name()).toBe('cfdi:Traslado');
    expect(element.getElementName()).toBe('cfdi:Traslado');
  });
});
