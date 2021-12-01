import { Impuestos } from './impuestos';

export class ConceptoImpuestos extends Impuestos {
  public getChildrenOrder(): string[] {
    return ['cfdi:Traslados', 'cfdi:Retenciones'];
  }
}
