import { ComplementoConcepto } from '../../../src/cfdi33';

describe('Elements.Cfdi33.ComplementoConcepto', () => {
  test('get element name', () => {
    const element = new ComplementoConcepto();
    expect(element.name()).toBe('cfdi:ComplementoConcepto');
    expect(element.getElementName()).toBe('cfdi:ComplementoConcepto');
  });
});
