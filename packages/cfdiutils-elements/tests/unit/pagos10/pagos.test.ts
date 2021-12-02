import { Pago, Pagos } from '../../../src/pagos10';

describe('Elements.Pagos10.Pagos', () => {
  let element: Pagos;
  beforeEach(() => {
    element = new Pagos();
  });

  test('get element name', () => {
    expect(element.name()).toBe('pago10:Pagos');
    expect(element.getElementName()).toBe('pago10:Pagos');
  });

  test('add pago', () => {
    // object is empty
    expect(element.count()).toBe(0);

    // add insert first element
    const first = element.addPago({ id: 'first' });
    expect(first).toBeInstanceOf(Pago);
    expect(first.attributes().get('id')).toBe('first');
    expect(element.count()).toBe(1);

    // add insert second element and is not the same
    const second = element.addPago({ id: 'second' });
    expect(second.attributes().get('id')).toBe('second');
    expect(element.count()).toBe(2);
    expect(second.attributes().get('id')).not.toBe(first.attributes().get('id'));
  });

  test('multi pago', () => {
    const node = element;
    expect(node.count()).toBe(0);
    const multiReturn = node.multiPago({ id: 'first' }, { id: 'second' });
    expect(node).toStrictEqual(multiReturn);
    expect(node.count()).toBe(2);
    expect(node.searchAttribute('pago10:Pago', 'id')).toBe('first');
  });
});
