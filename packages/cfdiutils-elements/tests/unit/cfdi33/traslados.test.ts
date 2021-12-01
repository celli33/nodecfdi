import { Traslado, Traslados } from '../../../src/cfdi33';

describe('Elements.Cfdi33.Traslados', () => {
  test('get element name', () => {
    const element = new Traslados();
    expect(element.name()).toBe('cfdi:Traslados');
    expect(element.getElementName()).toBe('cfdi:Traslados');
  });

  test('add traslado', () => {
    const element = new Traslados();

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
    expect(first.attributes().get('name')).not.toBe(second.attributes().get('name'));
  });

  test('multi traslado', () => {
    const node = new Traslados();
    expect(node.count()).toBe(0);
    const multiReturn = node.multiTraslado({ id: 'first' }, { id: 'second' });
    expect(node).toStrictEqual(multiReturn);
    expect(node.count()).toBe(2);
    expect(node.searchAttribute('cfdi:Traslado', 'id')).toBe('first');
  });
});
