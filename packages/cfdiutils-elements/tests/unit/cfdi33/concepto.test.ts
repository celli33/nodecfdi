import {
  ComplementoConcepto,
  Concepto,
  ConceptoImpuestos,
  CuentaPredial,
  Impuestos,
  InformacionAduanera,
  Parte,
} from '../../../src/cfdi33';

describe('Elements.Cfdi33.Concepto', () => {
  let element: Concepto;
  beforeEach(() => {
    element = new Concepto();
  });

  test('get element name', () => {
    expect(element.name()).toBe('cfdi:Concepto');
    expect(element.getElementName()).toBe('cfdi:Concepto');
  });

  test('get impuestos', () => {
    expect(element.searchNode('cfdi:Impuestos')).toBeUndefined();
    const child = element.getImpuestos();
    expect(child).toBeInstanceOf(ConceptoImpuestos);
    expect(element.searchNode('cfdi:Impuestos')).toStrictEqual(child);
  });

  test('get cuenta predial', () => {
    expect(element.searchNode('cfdi:CuentaPredial')).toBeUndefined();
    const child = element.getCuentaPredial();
    expect(child).toBeInstanceOf(CuentaPredial);
    expect(element.searchNode('cfdi:CuentaPredial')).toStrictEqual(child);
  });

  test('add cuenta predial', () => {
    const parent = element;
    expect(parent.count()).toBe(0);

    const first = parent.addCuentaPredial({
      id: 'first',
    });
    expect(parent.count()).toBe(1);
    expect(first).toBeInstanceOf(CuentaPredial);
    expect(parent.searchAttribute('cfdi:CuentaPredial', 'id')).toBe('first');

    const second = parent.addCuentaPredial({
      ID: 'BAR',
    });
    expect(second).toStrictEqual(first);
    expect(first.attributes().get('ID')).toBe('BAR');
  });

  test('get complemento concepto', () => {
    expect(element.searchNode('cfdi:ComplementoConcepto')).toBeUndefined();
    const child = element.getComplementoConcepto();
    expect(child).toBeInstanceOf(ComplementoConcepto);
    expect(element.searchNode('cfdi:ComplementoConcepto')).toStrictEqual(child);
  });

  test('add complemento concepto', () => {
    const parent = element;
    expect(parent.count()).toBe(0);

    const first = parent.addComplementoConcepto({
      ID: '123AD',
    });
    expect(parent.count()).toBe(1);
    expect(first).toBeInstanceOf(ComplementoConcepto);
    expect(first.attributes().get('ID')).toBe('123AD');

    const second = parent.addComplementoConcepto({
      ID: 'BAR',
    });
    expect(second).toStrictEqual(first);
    expect(second.attributes().get('ID')).toBe('BAR');
  });

  test('add parte', () => {
    // no child's
    const parent = element;
    expect(parent.count()).toBe(0);

    // add first child
    const first = parent.addParte({
      name: 'first',
    });
    expect(first).toBeInstanceOf(Parte);
    expect(first.attributes().get('name')).toBe('first');
    expect(parent.count()).toBe(1);

    // add second child
    parent.addParte();
    expect(parent.count()).toBe(2);
  });

  test('multi parte', () => {
    const node = element;
    expect(node.count()).toBe(0);
    const multiReturn = node.multiParte({ id: 'first' }, { id: 'second' });
    expect(multiReturn).toStrictEqual(node);
    expect(node.count()).toBe(2);
    expect(node.searchAttribute('cfdi:Parte', 'id')).toBe('first');
  });

  test('children order', () => {
    // add in inverse order
    element.addParte();
    element.getComplementoConcepto();
    element.getCuentaPredial();
    element.addInformacionAduanera();
    element.getImpuestos();

    // retrieve in correct order
    expect(element.children().get(0)).toBeInstanceOf(Impuestos);
    expect(element.children().get(1)).toBeInstanceOf(InformacionAduanera);
    expect(element.children().get(2)).toBeInstanceOf(CuentaPredial);
    expect(element.children().get(3)).toBeInstanceOf(ComplementoConcepto);
    expect(element.children().get(4)).toBeInstanceOf(Parte);
  });
});
