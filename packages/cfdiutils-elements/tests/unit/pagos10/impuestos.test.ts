import { Impuestos, Retenciones, Traslados } from '../../../src/pagos10';

describe('Elements.Pagos10.Impuestos', () => {
  let element: Impuestos;
  beforeEach(() => {
    element = new Impuestos();
  });

  test('get element name', () => {
    expect(element.name()).toBe('pago10:Impuestos');
    expect(element.getElementName()).toBe('pago10:Impuestos');
  });

  test('get traslados', () => {
    expect(element.searchNode('pago10:Traslados')).toBeUndefined();
    const child = element.getTraslados();
    expect(child).toBeInstanceOf(Traslados);
    expect(element.searchNode('pago10:Traslados')).toStrictEqual(child);
  });

  test('get retenciones', () => {
    expect(element.searchNode('pago10:Retenciones')).toBeUndefined();
    const child = element.getRetenciones();
    expect(child).toBeInstanceOf(Retenciones);
    expect(element.searchNode('pago10:Retenciones')).toStrictEqual(child);
  });

  test('children order', () => {
    // add in inverse order
    element.getTraslados();
    element.getRetenciones();

    // retrieve in correct order
    expect(element.children().get(0)).toBeInstanceOf(Retenciones);
    expect(element.children().get(1)).toBeInstanceOf(Traslados);
  });
});
