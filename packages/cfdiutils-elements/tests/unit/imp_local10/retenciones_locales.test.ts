import { RetencionesLocales } from '../../../src/imp_local10';

describe('Elements.ImpLocal10.RetencionesLocales', () => {
  test('get element name', () => {
    const element = new RetencionesLocales();
    expect(element.name()).toBe('implocal:RetencionesLocales');
    expect(element.getElementName()).toBe('implocal:RetencionesLocales');
  });
});
