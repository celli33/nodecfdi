import { Retencion, Retenciones } from '../../../src/pagos10';

describe('Elements.Pagos10.Retenciones', () => {
  let element: Retenciones;
  beforeEach(() => {
    element = new Retenciones();
  });

  test('get element name', () => {
    expect(element.name()).toBe('pago10:Retenciones');
    expect(element.getElementName()).toBe('pago10:Retenciones');
  });

  test('add retencion', () => {
    // no child's
    expect(element.count()).toBe(0);

    // add first child
    const first = element.addRetencion({
      name: 'first',
    });
    expect(first).toBeInstanceOf(Retencion);
    expect(first.attributes().get('name')).toBe('first');
    expect(element.count()).toBe(1);

    // add second child
    const second = element.addRetencion();
    expect(element.count()).toBe(2);

    // test that first and second are not the same
    expect(second.attributes().get('name')).not.toBe(first.attributes().get('name'));
  });

  test('multi retencion', () => {
    const node = element;
    expect(node.count()).toBe(0);
    const multiReturn = node.multiRetencion({ id: 'first' }, { id: 'second' });
    expect(node).toStrictEqual(multiReturn);
    expect(node.count()).toBe(2);
    expect(node.searchAttribute('pago10:Retencion', 'id')).toBe('first');
  });
});
