import { Retencion, Retenciones } from '../../../src/cfdi33';

describe('Elements.Cfdi33.Retenciones', () => {
  test('get element name', () => {
    const element = new Retenciones();
    expect(element.name()).toBe('cfdi:Retenciones');
    expect(element.getElementName()).toBe('cfdi:Retenciones');
  });

  test('add retencion', () => {
    const element = new Retenciones();

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
    expect(first.attributes().get('name')).not.toBe(second.attributes().get('name'));
  });

  test('multi retencion', () => {
    const node = new Retenciones();
    expect(node.count()).toBe(0);
    const multiReturn = node.multiRetencion({ id: 'first' }, { id: 'second' });
    expect(node).toStrictEqual(multiReturn);
    expect(node.count()).toBe(2);
    expect(node.searchAttribute('cfdi:Retencion', 'id')).toBe('first');
  });
});
