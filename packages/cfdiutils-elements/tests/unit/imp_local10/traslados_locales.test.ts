import { TrasladosLocales } from '../../../src/imp_local10';

describe('Elements.ImpLocal10.TrasladosLocales', () => {
  test('get element name', () => {
    const element = new TrasladosLocales();
    expect(element.name()).toBe('implocal:TrasladosLocales');
    expect(element.getElementName()).toBe('implocal:TrasladosLocales');
  });
});
