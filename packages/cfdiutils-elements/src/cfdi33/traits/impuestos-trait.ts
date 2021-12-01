import { Impuestos } from '../impuestos';
import { Traslado } from '../traslado';
import { Retencion } from '../retencion';

export abstract class ImpuestosTrait {
  abstract getImpuestos(): Impuestos;

  public addTraslado(attributes: Record<string, unknown> = {}): Traslado {
    return this.getImpuestos().getTraslados().addTraslado(attributes);
  }

  public multiTraslado(...elementAttributes: Record<string, unknown>[]): this {
    this.getImpuestos()
      .getTraslados()
      .multiTraslado(...elementAttributes);
    return this;
  }

  public addRetencion(attributes: Record<string, unknown> = {}): Retencion {
    return this.getImpuestos().getRetenciones().addRetencion(attributes);
  }

  public multiRetencion(...elementAttributes: Record<string, unknown>[]): this {
    this.getImpuestos()
      .getRetenciones()
      .multiRetencion(...elementAttributes);
    return this;
  }
}
