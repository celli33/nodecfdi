import {
  Addenda,
  CfdiRelacionado,
  CfdiRelacionados,
  Complemento,
  Comprobante,
  Concepto,
  Conceptos,
  Emisor,
  Impuestos,
  Receptor,
} from '../../../src/cfdi33';
import { CNode } from '@nodecfdi/cfdiutils-common';

describe('Elements.Cfdi33.Comprobante', () => {
  let element: Comprobante;
  beforeEach(() => {
    element = new Comprobante();
  });

  test('get element name', () => {
    expect(element.name()).toBe('cfdi:Comprobante');
    expect(element.getElementName()).toBe('cfdi:Comprobante');
  });

  test('get cfdi-relacionados', () => {
    expect(element.searchNode('cfdi:CfdiRelacionados'));
    const child = element.getCfdiRelacionados();
    expect(child).toBeInstanceOf(CfdiRelacionados);
    expect(element.searchNode('cfdi:CfdiRelacionados')).toStrictEqual(child);
  });

  test('add relacionado', () => {
    const first = element.addCfdiRelacionado({
      UUID: 'FOO',
    });
    expect(first).toBeInstanceOf(CfdiRelacionado);
    expect(first.attributes().get('UUID')).toBe('FOO');
    expect(element.getCfdiRelacionados().count()).toBe(1);
  });

  test('multi relacionado', () => {
    const self = element.multiCfdiRelacionado({ UUID: 'FOO' }, { UUID: 'BAR' });
    expect(self).toStrictEqual(element);
    expect(element.getCfdiRelacionados().count()).toBe(2);
    expect(element.getCfdiRelacionados().children().get(0).attributes().get('UUID')).toBe('FOO');
    expect(element.getCfdiRelacionados().children().get(1).attributes().get('UUID')).toBe('BAR');
  });

  test('get emisor', () => {
    expect(element.searchNode('cfdi:Emisor')).toBeUndefined();
    const child = element.getEmisor();
    expect(child).toBeInstanceOf(Emisor);
    expect(element.searchNode('cfdi:Emisor')).toStrictEqual(child);
  });

  test('add emisor', () => {
    const first = element.addEmisor({
      Rfc: 'FOO',
    });
    expect(first).toBeInstanceOf(Emisor);
    expect(first.attributes().get('Rfc')).toBe('FOO');

    const second = element.addEmisor({
      Rfc: 'BAR',
    });
    expect(second).toStrictEqual(first);
    expect(first.attributes().get('Rfc')).toBe('BAR');
  });

  test('get receptor', () => {
    expect(element.searchNode('cfdi:Receptor')).toBeUndefined();
    const child = element.getReceptor();
    expect(child).toBeInstanceOf(Receptor);
    expect(element.searchNode('cfdi:Receptor')).toStrictEqual(child);
  });

  test('add receptor', () => {
    const first = element.addReceptor({
      Rfc: 'BAZ',
    });
    expect(first).toBeInstanceOf(Receptor);
    expect(first.attributes().get('Rfc')).toBe('BAZ');

    const second = element.addReceptor({
      Rfc: 'BAR',
    });
    expect(second).toStrictEqual(first);
    expect(first.attributes().get('Rfc')).toBe('BAR');
  });

  test('get conceptos', () => {
    expect(element.searchNode('cfdi:Conceptos')).toBeUndefined();
    const child = element.getConceptos();
    expect(child).toBeInstanceOf(Conceptos);
    expect(element.searchNode('cfdi:Conceptos')).toStrictEqual(child);
  });

  test('get impuestos', () => {
    expect(element.searchNode('cfdi:Impuestos')).toBeUndefined();
    const child = element.getImpuestos();
    expect(child).toBeInstanceOf(Impuestos);
    expect(element.searchNode('cfdi:Impuestos')).toStrictEqual(child);
  });

  test('add impuestos', () => {
    const first = element.addImpuestos({
      Foo: 'Bar',
    });
    expect(first).toBeInstanceOf(Impuestos);
    expect(first.attributes().get('Foo')).toBe('Bar');

    const second = element.addImpuestos({
      Foo: 'BAR',
    });
    expect(second).toStrictEqual(first);
    expect(first.attributes().get('Foo')).toBe('BAR');
  });

  test('add concepto', () => {
    expect(element.count()).toBe(0);

    const first = element.addConcepto({ name: 'FOO' });
    expect(first).toBeInstanceOf(Concepto);
    expect(first.attributes().get('name')).toBe('FOO');
    expect(element.count()).toBe(1);
  });

  test('get complemento', () => {
    expect(element.searchNode('cfdi:Complemento')).toBeUndefined();
    const child = element.getComplemento();
    expect(child).toBeInstanceOf(Complemento);
    expect(element.searchNode('cfdi:Complemento')).toStrictEqual(child);
  });

  test('add complemento', () => {
    expect(element.count()).toBe(0);

    const child = new CNode('first');
    const addReturn = element.addComplemento(child);
    expect(element.count()).toBe(1);
    expect(element.searchNode('cfdi:Complemento', 'first')).toStrictEqual(child);
    expect(element).toStrictEqual(addReturn);
  });

  test('get addenda', () => {
    expect(element.searchNode('cfdi:Addenda')).toBeUndefined();
    const child = element.getAddenda();
    expect(child).toBeInstanceOf(Addenda);
    expect(element.searchNode('cfdi:Addenda')).toStrictEqual(child);
  });

  test('add addenda', () => {
    expect(element.count()).toBe(0);

    const child = new CNode('first');
    const addReturn = element.addAddenda(child);
    expect(element.count()).toBe(1);
    expect(element.searchNode('cfdi:Addenda', 'first')).toStrictEqual(child);
    expect(element).toStrictEqual(addReturn);
  });

  test('has fixed attributes', () => {
    const namespace = 'http://www.sat.gob.mx/cfd/3';
    expect(element.attributes().get('Version')).toBe('3.3');
    expect(element.attributes().get('xmlns:cfdi')).toBe(namespace);
    expect(element.attributes().get('xsi:schemaLocation').startsWith(`${namespace} http://`)).toBeTruthy();
    expect(element.attributes().get('xmlns:xsi')).not.toBe('');
  });

  test('children order', () => {
    // add in inverse order
    element.getAddenda();
    element.getComplemento();
    element.getImpuestos();
    element.getConceptos();
    element.getReceptor();
    element.getEmisor();
    element.getCfdiRelacionados();

    // retrieve in correct order
    expect(element.children().get(0)).toBeInstanceOf(CfdiRelacionados);
    expect(element.children().get(1)).toBeInstanceOf(Emisor);
    expect(element.children().get(2)).toBeInstanceOf(Receptor);
    expect(element.children().get(3)).toBeInstanceOf(Conceptos);
    expect(element.children().get(4)).toBeInstanceOf(Impuestos);
    expect(element.children().get(5)).toBeInstanceOf(Complemento);
    expect(element.children().get(6)).toBeInstanceOf(Addenda);
  });
});
