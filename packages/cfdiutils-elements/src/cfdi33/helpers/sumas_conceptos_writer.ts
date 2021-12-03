import { Comprobante } from '../comprobante';
import { SumasConceptos } from '@nodecfdi/cfdiutils-elements';

export class SumasConceptosWriter {
  private readonly comprobante: Comprobante;
  private readonly sumas: SumasConceptos;
  private readonly precision: number;

  constructor(comprobante: Comprobante, sumas: SumasConceptos, precision = 6) {
    this.comprobante = comprobante;
    this.sumas = sumas;
    this.precision = precision;
  }

  public put() {
    this.putComprobanteSumas();
    this.putImpuestosNode();
  }

  private putComprobanteSumas() {
    this.comprobante.attributes().set('SubTotal', this.format(this.sumas.getSubTotal()));
    this.comprobante.attributes().set('Total', this.format(this.sumas.getTotal()));
    this.comprobante.attributes().set('Descuento', this.format(this.sumas.getDescuento()));
    if (!this.sumas.isFoundAnyConceptWithDiscount() && !this.valueGreaterThanZero(this.sumas.getDescuento())) {
      this.comprobante.attributes().delete('Descuento');
    }
  }

  private putImpuestosNode() {
    // obtain node reference
    const impuestos = this.comprobante.getImpuestos();
    // if there is nothing to write then remove the children and exit
    if (!this.sumas.hasTraslados() && !this.sumas.hasRetenciones()) {
      this.comprobante.children().remove(impuestos);
      return;
    }
    // clear previous values
    impuestos.clear();
    // add traslados when needed
    if (this.sumas.hasTraslados()) {
      impuestos.attributes().set('TotalImpuestosTrasladados', this.format(this.sumas.getImpuestosTrasladados()));
      impuestos.getTraslados().multiTraslado(...this.getImpuestosContents(this.sumas.getTraslados()));
    }
    // add retenciones when needed
    if (this.sumas.hasRetenciones()) {
      impuestos.attributes().set('TotalImpuestosRetenidos', this.format(this.sumas.getImpuestosRetenidos()));
      impuestos.getRetenciones().multiRetencion(...this.getImpuestosContents(this.sumas.getRetenciones()));
    }
  }

  private getImpuestosContents(
    impuestos: Record<string, Record<string, string | number>>
  ): Record<string, string | number>[] {
    const returnList: Record<string, string | number>[] = [];
    Object.values(impuestos).forEach((impuesto) => {
      impuesto['Importe'] = this.format(Number(impuesto['Importe']));
      returnList.push(impuesto);
    });
    return returnList;
  }

  private valueGreaterThanZero(value: number): boolean {
    return Number(value.toFixed(this.precision)) > 0;
  }

  public format(num: number): string {
    // added current fixed to since in javascript
    // toFixed-function, the floating point number 5
    // does not belong to the upper half of an integer,
    // the given number is rounded down
    const toFixed = (number, decimals) => {
      const base = 10 ** decimals;
      return (Math.round(number * base) / base).toFixed(decimals);
    };
    return toFixed(num, this.precision);
  }

  public getComprobante(): Comprobante {
    return this.comprobante;
  }

  public getSumasConceptos(): SumasConceptos {
    return this.sumas;
  }

  public getPrecision(): number {
    return this.precision;
  }
}
