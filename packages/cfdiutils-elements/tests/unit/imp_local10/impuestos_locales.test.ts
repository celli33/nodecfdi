import { ImpuestosLocales, RetencionesLocales, TrasladosLocales } from '../../../src/imp_local10';

describe('Elements.ImpLocal10.RetencionesLocales', () => {
  let element: ImpuestosLocales;
  beforeEach(() => {
    element = new ImpuestosLocales();
  });

  test('get element name', () => {
    expect(element.name()).toBe('implocal:RetencionesLocales');
    expect(element.getElementName()).toBe('implocal:RetencionesLocales');
  });

  test('retencion', () => {
    // object is empty
    expect(element.count()).toBe(0);

    // add insert first element
    const first = element.addRetencionLocal({ id: 'first' });
    expect(first).toBeInstanceOf(RetencionesLocales);
    expect(first.attributes().get('id')).toBe('first');
    expect(element.count()).toBe(1);

    // add insert second element and is not the same
    const second = element.addRetencionLocal({ id: 'second' });
    expect(second.attributes().get('id')).toBe('second');
    expect(element.count()).toBe(2);
    expect(second.attributes().get('id')).not.toBe(first.attributes().get('id'));
  });

  test('traslado', () => {
    // object is empty
    expect(element.count()).toBe(0);

    // add insert first element
    const first = element.addTrasladoLocal({ id: 'first' });
    expect(first).toBeInstanceOf(TrasladosLocales);
    expect(first.attributes().get('id')).toBe('first');
    expect(element.count()).toBe(1);

    // add insert second element and is not the same
    const second = element.addTrasladoLocal({ id: 'second' });
    expect(second.attributes().get('id')).toBe('second');
    expect(element.count()).toBe(2);
    expect(second.attributes().get('id')).not.toBe(first.attributes().get('id'));
  });

  test('children order', () => {
    // add in inverse order
    element.addTrasladoLocal();
    element.addRetencionLocal();

    // retrieve in correct order
    expect(element.children().get(0)).toBeInstanceOf(RetencionesLocales);
    expect(element.children().get(1)).toBeInstanceOf(TrasladosLocales);
  });
});
