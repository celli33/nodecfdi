import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class SumasConceptos {
  private importes = 0.0;
  private descuento = 0.0;
  private total: number;
  private impuestosTrasladados: number;
  private impuestosRetenidos: number;
  private traslados: Record<string, Record<string, string | number>> = {};
  private retenciones: Record<string, Record<string, string | number>> = {};
  private localesImpuestosTraslados: number;
  private localesImpuestosRetenidos: number;
  private localesTraslados: Record<string, string | number>[] = [];
  private localesRetenciones: Record<string, string | number>[] = [];
  private readonly precision;
  private foundAnyConceptWithDiscount = false;

  constructor(comprobante: CNodeInterface, precision = 2) {
    this.precision = precision;
    this.addComprobante(comprobante);
  }

  /**
   * Helper functions to populate the object
   * @param comprobante
   * @private
   */
  private addComprobante(comprobante: CNodeInterface) {
    const conceptos = comprobante.searchNodes('cfdi:Conceptos', 'cfdi:Concepto');
    conceptos.forEach((concepto) => {
      this.addConcepto(concepto);
    });

    this.localesTraslados = this.populateImpuestosLocales(comprobante, 'TrasladosLocales', 'Traslado');
    this.localesImpuestosTraslados = this.localesTraslados.reduce((a: number, b) => a + (Number(b['Importe']) || 0), 0);
    this.localesRetenciones = this.populateImpuestosLocales(comprobante, 'RetencionesLocales', 'Retenido');
    this.localesImpuestosRetenidos = this.localesRetenciones.reduce(
      (a: number, b) => a + (Number(b['Importe']) || 0),
      0
    );

    this.traslados = this.roundImpuestosGroup(this.traslados);
    this.retenciones = this.roundImpuestosGroup(this.retenciones);
    this.impuestosTrasladados = Object.values(this.traslados)
      .map((v) => Number(v['Importe']) || 0)
      .reduce((a: number, b) => a + (b || 0), 0);
    this.impuestosRetenidos = Object.values(this.retenciones)
      .map((v) => Number(v['Importe']) || 0)
      .reduce((a: number, b) => a + (b || 0), 0);

    this.impuestosTrasladados = Number(this.impuestosTrasladados.toFixed(this.precision));
    this.impuestosRetenidos = Number(this.impuestosRetenidos.toFixed(this.precision));
    this.importes = Number(this.importes.toFixed(this.precision));
    this.descuento = Number(this.descuento.toFixed(this.precision));

    this.total = Number(
      [
        this.importes,
        -this.descuento,
        this.impuestosTrasladados,
        -this.impuestosRetenidos,
        this.localesImpuestosTraslados,
        -this.localesImpuestosRetenidos,
      ]
        .reduce((a, b) => a + b, 0)
        .toFixed(this.precision)
    );
  }

  private addConcepto(concepto: CNodeInterface) {
    this.importes += Number.parseFloat(concepto.attributes().get('Importe') || '0');
    if (concepto.attributes().has('Descuento')) {
      this.foundAnyConceptWithDiscount = true;
    }
    this.descuento += Number.parseFloat(concepto.attributes().get('Descuento') || '0');

    const traslados = concepto.searchNodes('cfdi:Impuestos', 'cfdi:Traslados', 'cfdi:Traslado');
    traslados.forEach((traslado) => {
      if (traslado.attributes().get('TipoFactor') !== 'Exento') {
        this.addTraslado(traslado);
      }
    });

    const retenciones = concepto.searchNodes('cfdi:Impuestos', 'cfdi:Retenciones', 'cfdi:Retencion');
    retenciones.forEach((retencion) => {
      this.addRetencion(retencion);
    });
  }

  private populateImpuestosLocales(
    comprobante: CNodeInterface,
    plural: string,
    singular: string
  ): Record<string, string | number>[] {
    const locales = comprobante.searchNodes('cfdi:Complemento', 'implocal:ImpuestosLocales', `implocal:${plural}`);
    const list: Record<string, string | number>[] = [];
    locales.forEach((local) => {
      list.push({
        Impuesto: local.attributes().get(`ImpLoc${singular}`),
        Tasa: Number.parseFloat(local.attributes().get(`Tasade${singular}`)),
        Importe: Number.parseFloat(local.attributes().get('Importe')),
      });
    });
    return list;
  }

  private roundImpuestosGroup(
    group: Record<string, Record<string, string | number>>
  ): Record<string, Record<string, string | number>> {
    Object.keys(group).forEach((key) => {
      group[key]['Importe'] = Number(group[key]['Importe']).toFixed(this.precision);
    });
    return group;
  }

  private addTraslado(traslado: CNodeInterface): void {
    const attributes = traslado.attributes();
    const key = SumasConceptos.impuestoKey(
      attributes.get('Impuesto'),
      attributes.get('TipoFactor'),
      attributes.get('TasaOCuota')
    );
    if (!this.traslados[key]) {
      this.traslados[key] = {
        Impuesto: attributes.get('Impuesto'),
        TipoFactor: attributes.get('TipoFactor'),
        TasaOCuota: attributes.get('TasaOCuota'),
        Importe: 0.0,
      };
    }
    (this.traslados[key]['Importe'] as number) += Number.parseFloat(attributes.get('Importe'));
  }

  private addRetencion(retencion: CNodeInterface): void {
    const key = SumasConceptos.impuestoKey(retencion.attributes().get('Impuesto'));
    if (!this.retenciones[key]) {
      this.retenciones[key] = {
        Impuesto: retencion.attributes().get('Impuesto'),
        Importe: 0.0,
      };
    }
    (this.retenciones[key]['Importe'] as number) += Number.parseFloat(retencion.attributes().get('Importe'));
  }

  public static impuestoKey(impuesto: string, tipoFactor = '', tasaOCuota = ''): string {
    return [impuesto, tipoFactor, tasaOCuota].join(':');
  }

  /**
   * Getters
   */

  public getTotal(): number {
    return this.total;
  }

  public getSubTotal(): number {
    return this.importes;
  }

  public getDescuento(): number {
    return this.descuento;
  }

  public getTraslados(): Record<string, Record<string, string | number>> {
    return this.traslados;
  }

  public getRetenciones(): Record<string, Record<string, string | number>> {
    return this.retenciones;
  }

  public hasTraslados(): boolean {
    return Object.keys(this.traslados).length > 0;
  }

  public hasRetenciones(): boolean {
    return Object.keys(this.retenciones).length > 0;
  }

  public getImpuestosTrasladados(): number {
    return this.impuestosTrasladados;
  }

  public getImpuestosRetenidos(): number {
    return this.impuestosRetenidos;
  }

  public getPrecision(): number {
    return this.precision;
  }

  public getLocalesImpuestosTrasladados(): number {
    return this.localesImpuestosTraslados;
  }

  public getLocalesImpuestosRetenidos(): number {
    return this.localesImpuestosRetenidos;
  }

  public getLocalesTraslados(): Record<string, string | number>[] {
    return this.localesTraslados;
  }

  public getLocalesRetenciones(): Record<string, string | number>[] {
    return this.localesRetenciones;
  }

  public hasLocalesTraslados(): boolean {
    return this.localesTraslados.length > 0;
  }

  public hasLocalesRetenciones(): boolean {
    return this.localesRetenciones.length > 0;
  }

  public isFoundAnyConceptWithDiscount(): boolean {
    return this.foundAnyConceptWithDiscount;
  }
}
