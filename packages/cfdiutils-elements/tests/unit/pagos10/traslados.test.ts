import { Traslado, Traslados } from '../../../src/pagos10';

describe('Elements.Pagos10.Traslados', () => {
  let element: Traslados;
  beforeEach(() => {
    element = new Traslados();
  });

  test('get element name', () => {
    expect(element.name()).toBe('pago10:Traslados');
    expect(element.getElementName()).toBe('pago10:Traslados');
  });

  test('add traslado', () => {
    // no child's
    expect(element.count()).toBe(0);

    // add first child
    const first = element.addTraslado({
      name: 'first',
    });
    expect(first).toBeInstanceOf(Traslado);
    expect(first.attributes().get('name')).toBe('first');
    expect(element.count()).toBe(1);

    // add second child
    const second = element.addTraslado();
    expect(element.count()).toBe(2);

    // test that first and second are not the same
    expect(second.attributes().get('name')).not.toBe(first.attributes().get('name'));
  });

  test('multi traslado', () => {
    const node = element;
    expect(node.count()).toBe(0);
    const multiReturn = node.multiTraslado({ id: 'first' }, { id: 'second' });
    expect(node).toStrictEqual(multiReturn);
    expect(node.count()).toBe(2);
    expect(node.searchAttribute('pago10:Traslado', 'id')).toBe('first');
  });
});
