import { CNode } from '@nodecfdi/cfdiutils-common';
import { SumasConceptos } from '../../src';
import { Comprobante } from '../../src/cfdi33';
import { ImpuestosLocales } from '../../src/imp_local10/impuestos_locales';

describe('SumasConceptos', () => {
  test('constructor', () => {
    const sc = new SumasConceptos(new CNode('x'));
    expect(sc.getPrecision()).toBe(2);
    expect(sc.getSubTotal()).toBe(0);
    expect(sc.getTotal()).toBe(0);
    expect(sc.getDescuento()).toBe(0);
    expect(sc.getImpuestosRetenidos()).toBe(0);
    expect(sc.getImpuestosTrasladados()).toBe(0);
    expect(sc.getLocalesImpuestosRetenidos()).toBe(0);
    expect(sc.getLocalesImpuestosTrasladados()).toBe(0);
    expect([...Object.values(sc.getRetenciones())]).toHaveLength(0);
    expect([...Object.values(sc.getTraslados())]).toHaveLength(0);
    expect(sc.getLocalesRetenciones()).toHaveLength(0);
    expect(sc.getLocalesTraslados()).toHaveLength(0);
    expect(sc.hasRetenciones()).toBeFalsy();
    expect(sc.hasTraslados()).toBeFalsy();
    expect(sc.hasLocalesRetenciones()).toBeFalsy();
    expect(sc.hasLocalesTraslados()).toBeFalsy();
    expect(sc.isFoundAnyConceptWithDiscount()).toBeFalsy();
  });

  test.each([
    ['tax uses 1 dec', 1, 333.33, 53.4, 386.73],
    ['tax uses 6 dec', 6, 333.33, 53.33, 386.66],
  ])(
    'with concepts decimals %s',
    (test: string, taxDecimals: number, subtotal: number, traslados: number, total: number) => {
      const comprobante = new Comprobante();
      comprobante
        .addConcepto({
          Importe: '111.11',
        })
        .addTraslado({
          Impuesto: '002',
          TipoFactor: 'Tasa',
          TasaOCuota: '0.160000',
          Importe: (111.11 * 0.16).toFixed(taxDecimals),
        });
      comprobante
        .addConcepto({
          Importe: '222.22',
        })
        .addTraslado({
          Impuesto: '002',
          TipoFactor: 'Tasa',
          TasaOCuota: '0.160000',
          Importe: (222.22 * 0.16).toFixed(taxDecimals),
        });
      const sc = new SumasConceptos(comprobante, 2);
      expect(sc.getSubTotal()).toBe(subtotal);
      expect(sc.getImpuestosTrasladados()).toBe(traslados);
      expect(sc.getTotal()).toBe(total);

      // these are zero
      expect(sc.getDescuento()).toBe(0);
      expect(sc.getImpuestosRetenidos()).toBe(0);
      expect([...Object.entries(sc.getRetenciones())]).toHaveLength(0);
    }
  );

  test('with impuestos locales', () => {
    const taxDecimals = 4;
    const comprobante = new Comprobante();
    comprobante
      .addConcepto({
        Importe: '111.11',
      })
      .addTraslado({
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
        Importe: (111.11 * 0.16).toFixed(taxDecimals),
      });
    comprobante
      .addConcepto({
        Importe: '222.22',
      })
      .addTraslado({
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
        Importe: (222.22 * 0.16).toFixed(taxDecimals),
      });
    const impuestosLocales = new ImpuestosLocales();
    impuestosLocales.addTrasladoLocal({
      ImpLocTrasladado: 'IH',
      TasadeTraslado: '2.5',
      Importe: (333.33 * 0.025).toFixed(2),
    });
    comprobante.getComplemento().add(impuestosLocales);
    const sc = new SumasConceptos(comprobante, 2);

    expect([...Object.entries(sc.getTraslados())]).toHaveLength(1);
    expect(sc.hasTraslados()).toBeTruthy();
    expect(sc.getLocalesTraslados()).toHaveLength(1);

    expect(sc.getSubTotal()).toBe(333.33);
    expect(sc.getImpuestosTrasladados()).toBe(53.33);
    expect(sc.getLocalesImpuestosTrasladados()).toBe(8.33);
    expect(sc.getTotal()).toBe(Number((333.33 + 53.33 + 8.33).toFixed(2)));

    // these are zero
    expect(sc.getDescuento()).toBe(0);
    expect(sc.getImpuestosRetenidos()).toBe(0);
    expect([...Object.entries(sc.getRetenciones())]).toHaveLength(0);
    expect(sc.getLocalesImpuestosRetenidos()).toBe(0);
    expect(sc.getLocalesRetenciones()).toHaveLength(0);
  });

  test('found any concept with discount', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '111.11' });
    comprobante.addConcepto({ Importe: '222.22' });
    expect(new SumasConceptos(comprobante).isFoundAnyConceptWithDiscount()).toBeFalsy();

    // now add the attribute Descuento
    comprobante.addConcepto({ Importe: '333.33', Descuento: '' });
    expect(new SumasConceptos(comprobante).isFoundAnyConceptWithDiscount()).toBeTruthy();
  });

  test('impuesto importe with more decimals than the precision is rounded', () => {
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

    const sumas = new SumasConceptos(comprobante, 3);
    expect(sumas.hasTraslados()).toBeTruthy();
    expect(sumas.getImpuestosTrasladados()).toBe(10.0);
    expect(sumas.getTraslados()['002:Tasa:0.160000']['Importe']).toBe((10.0).toFixed(3));
  });

  test('impuesto with traslados Tasa and Exento', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto().multiTraslado(
      ...[
        { Impuesto: '002', TipoFactor: 'Exento' },
        { Impuesto: '002', TipoFactor: 'Tasa', TasaOCuota: '0.160000', Base: '1000', Importe: '160' },
      ]
    );
    comprobante.addConcepto().multiTraslado(
      ...[
        {
          Impuesto: '002',
          TipoFactor: 'Tasa',
          TasaOCuota: '0.160000',
          Base: '1000',
          Importe: '160',
        },
      ]
    );

    const sumas = new SumasConceptos(comprobante, 2);
    expect(sumas.hasTraslados()).toBeTruthy();
    expect(sumas.getImpuestosTrasladados()).toBe(320.0);
    expect([...Object.entries(sumas.getTraslados())]).toHaveLength(1);
  });

  test('impuesto with Traslados and only Exento', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto().multiTraslado(...[{ Impuesto: '002', TipoFactor: 'Exento' }]);
    comprobante.addConcepto().multiTraslado(...[{ Impuesto: '002', TipoFactor: 'Exento' }]);

    const sumas = new SumasConceptos(comprobante, 2);
    expect(sumas.hasTraslados()).toBeFalsy();
    expect(sumas.getImpuestosTrasladados()).toBe(0);
    expect([...Object.entries(sumas.getTraslados())]).toHaveLength(0);
  });
});
