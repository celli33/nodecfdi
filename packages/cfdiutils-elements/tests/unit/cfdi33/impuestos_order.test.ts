import { Comprobante, Concepto, ConceptoImpuestos, Impuestos } from '../../../src/cfdi33';

describe('Impuestos Order', () => {
  test('comprobante impuestos order is Retenciones Traslados', () => {
    const comprobante = new Comprobante();
    const impuestos = comprobante.getImpuestos();
    expect(impuestos).toBeInstanceOf(Impuestos);
    const expectedOrder = ['cfdi:Retenciones', 'cfdi:Traslados'];
    expect(JSON.stringify(impuestos.getChildrenOrder())).toEqual(JSON.stringify(expectedOrder));
  });

  test('concepto impuestos order is Traslados Retenciones', () => {
    const concepto = new Concepto();
    const impuestos = concepto.getImpuestos();
    expect(impuestos).toBeInstanceOf(Impuestos);
    expect(impuestos).toBeInstanceOf(ConceptoImpuestos);
    const expectedOrder = ['cfdi:Traslados', 'cfdi:Retenciones'];
    expect(JSON.stringify(impuestos.getChildrenOrder())).toEqual(JSON.stringify(expectedOrder));
  });
});
