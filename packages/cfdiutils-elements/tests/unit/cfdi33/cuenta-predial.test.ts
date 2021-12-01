import { CuentaPredial } from '../../../src/cfdi33';

describe('Elements.Cfdi33.CuentaPredial', () => {
  test('get element name', () => {
    const element = new CuentaPredial();
    expect(element.name()).toBe('cfdi:CuentaPredial');
    expect(element.getElementName()).toBe('cfdi:CuentaPredial');
  });
});
