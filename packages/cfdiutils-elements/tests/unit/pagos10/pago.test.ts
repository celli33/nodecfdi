import { DoctoRelacionado, Impuestos, Pago } from '../../../src/pagos10';

describe('Elements.Pagos10.Pago', () => {
  let element: Pago;
  beforeEach(() => {
    element = new Pago();
  });

  test('get element name', () => {
    expect(element.name()).toBe('pago10:Pago');
    expect(element.getElementName()).toBe('pago10:Pago');
  });

  test('docto relacionado', () => {
    // object is empty
    expect(element.count()).toBe(0);

    // add insert first element
    const first = element.addDoctoRelacionado({ id: 'first' });
    expect(first).toBeInstanceOf(DoctoRelacionado);
    expect(first.attributes().get('id')).toBe('first');
    expect(element.count()).toBe(1);

    // add insert second element and is not the same
    const second = element.addDoctoRelacionado({ id: 'second' });
    expect(second.attributes().get('id')).toBe('second');
    expect(element.count()).toBe(2);
    expect(second.attributes().get('id')).not.toBe(first.attributes().get('id'));
  });

  test('impuestos', () => {
    // object is empty
    expect(element.count()).toBe(0);

    // add insert first element
    const first = element.addImpuestos({ id: 'first' });
    expect(first).toBeInstanceOf(Impuestos);
    expect(first.attributes().get('id')).toBe('first');
    expect(element.count()).toBe(1);

    // add insert second element and is not the same
    const second = element.addImpuestos({ id: 'second' });
    expect(second.attributes().get('id')).toBe('second');
    expect(element.count()).toBe(2);
    expect(second.attributes().get('id')).not.toBe(first.attributes().get('id'));
  });

  test('children order', () => {
    // add in inverse order
    element.addImpuestos();
    element.addDoctoRelacionado();

    // retrieve in correct order
    expect(element.children().get(0)).toBeInstanceOf(DoctoRelacionado);
    expect(element.children().get(1)).toBeInstanceOf(Impuestos);
  });
});
