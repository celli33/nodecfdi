import { Comprobante, SumasConceptosWriter } from '../../../../src/cfdi33';
import { SumasConceptos } from '../../../../src';
import { XmlNodeUtils } from '@nodecfdi/cfdiutils-common';

describe('Cfdi33.SumasConceptosWriter', () => {
  test('constructor', () => {
    const precision = 6;
    const comprobante = new Comprobante();
    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    expect(writer.getComprobante()).toStrictEqual(comprobante);

    expect(writer.getPrecision()).toBe(precision);
    expect(writer.getSumasConceptos()).toStrictEqual(sumasConceptos);
  });

  test('format', () => {
    const precision = 6;
    const comprobante = new Comprobante();
    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);

    expect(writer.format(1.2345664)).toBe('1.234566');
    expect(writer.format(1.2345665)).toBe('1.234567');
    expect(writer.format(1.2345674)).toBe('1.234567');
    expect(writer.format(1.2345675)).toBe('1.234568');
    expect(writer.format(1)).toBe('1.000000');
  });

  test('put with empty values', () => {
    const precision = 2;
    const comprobante = new Comprobante();
    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    writer.put();

    expect(comprobante.attributes().get('SubTotal')).toBe('0.00');
    expect(comprobante.attributes().has('Descuento')).toBeFalsy();
    expect(comprobante.attributes().get('Total')).toBe('0.00');
    expect(comprobante.searchNode('cfdi:Impuestos')).toBeUndefined();
  });

  test('put with empty conceptos impuestos', () => {
    const precision = 2;
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: 1000, Descuento: 1000 });
    comprobante.addConcepto({ Importe: 2000, Descuento: 2000 });

    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    writer.put();

    expect(comprobante.attributes().get('SubTotal')).toBe('3000.00');
    expect(comprobante.attributes().get('Descuento')).toBe('3000.00');
    expect(comprobante.attributes().get('Total')).toBe('0.00');
    expect(comprobante.searchNode('cfdi:Impuestos')).toBeUndefined();
  });

  test('put with zero conceptos impuestos', () => {
    const precision = 2;
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '1000' }).addTraslado({
      Base: '1000',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.000000',
      Importe: '0',
    });
    comprobante.addConcepto({ Importe: '2000' }).addTraslado({
      Base: '2000',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.000000',
      Importe: '0',
    });

    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    writer.put();

    expect(comprobante.attributes().get('SubTotal')).toBe('3000.00');
    expect(comprobante.attributes().has('Descuento')).toBeFalsy();
    expect(comprobante.attributes().get('Total')).toBe('3000.00');
    expect(comprobante.searchNode('cfdi:Impuestos')).not.toBeUndefined();
    const impuestos = comprobante.getImpuestos();
    expect(impuestos.attributes().has('TotalImpuestosTrasladados')).toBeTruthy();
    expect(impuestos.attributes().get('TotalImpuestosTrasladados')).toBe('0.00');
    expect(impuestos.attributes().has('TotalImpuestosRetenidos')).toBeFalsy();
  });

  test('put with conceptos impuestos', () => {
    const precision = 2;
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '2000', Descuento: '1000' }).addTraslado({
      Base: '1000',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: '160',
    });
    comprobante.addConcepto({ Importe: '4000', Descuento: '2000' }).addTraslado({
      Base: '2000',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: '320',
    });

    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    writer.put();

    expect(comprobante.attributes().get('SubTotal')).toBe('6000.00');
    expect(comprobante.attributes().get('Descuento')).toBe('3000.00');
    expect(comprobante.attributes().get('Total')).toBe('3480.00');
    expect(comprobante.searchNode('cfdi:Impuestos')).not.toBeUndefined();
    const impuestos = comprobante.getImpuestos();
    expect(impuestos.attributes().has('TotalImpuestosTrasladados')).toBeTruthy();
    expect(impuestos.attributes().get('TotalImpuestosTrasladados')).toBe('480.00');
    expect(impuestos.attributes().has('TotalImpuestosRetenidos')).toBeFalsy();
  });

  test('descuento with value zero exists if a concepto has descuento', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto({}); // first concepto does not have Descuento
    comprobante.addConcepto({ Descuento: '' }); // second concepto has Descuento

    const precision = 2;
    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    writer.put();

    expect(comprobante.attributes().get('Descuento')).toBe('0.00');
  });

  test('descuento not set if all conceptos does not have descuento', () => {
    const comprobante = new Comprobante({ Descuento: '' }); // set value with discount
    comprobante.addConcepto(); // first concepto does not have Descuento
    comprobante.addConcepto(); // second concepto does not have Descuento neither

    const precision = 2;
    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    writer.put();

    // the Comprobante@Descuento attribute must not exist since there is no Descuento in concepts
    expect(comprobante.attributes().has('Descuento')).toBeFalsy();
  });

  test('on complemento impuestos importe sum is rounded', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto().addTraslado({
      Importe: '7.777777',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
    });
    comprobante.addConcepto().addTraslado({
      Importe: '2.222222',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
    });

    const precision = 3;
    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    writer.put();

    expect(comprobante.searchAttribute('cfdi:Impuestos', 'TotalImpuestosTrasladados')).toBe('10.000');
    expect(comprobante.searchAttribute('cfdi:Impuestos', 'cfdi:Traslados', 'cfdi:Traslado', 'Importe')).toBe('10.000');
  });

  test('conceptos only with traslados exentos does not write traslados', () => {
    const comprobante = new Comprobante();
    const concepto = comprobante.addConcepto();
    concepto.addTraslado({ Base: '1000', Impuesto: '002', TipoFactor: 'Exento' });
    concepto.addRetencion({
      Base: '1000.00',
      Impuesto: '001',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.04000',
      Importe: '40.00',
    });
    comprobante.addConcepto().addTraslado({ Base: '1000', Impuesto: '002', TipoFactor: 'Exento' });

    const precision = 2;
    const sumasConceptos = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sumasConceptos, precision);
    writer.put();

    const expected = [
      '<cfdi:Impuestos TotalImpuestosRetenidos="40.00">',
      '<cfdi:Retenciones>',
      '<cfdi:Retencion Impuesto="001" Importe="40.00"/>',
      '</cfdi:Retenciones>',
      '</cfdi:Impuestos>',
    ].join('');
    expect(XmlNodeUtils.nodeToXmlString(comprobante.getImpuestos())).toBe(expected);
  });
});
