import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { Retencion } from './retencion';

export class Retenciones extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Retenciones', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Retenciones';
  }

  public addRetencion(attributes: Record<string, unknown> = {}): Retencion {
    const retencion = new Retencion(attributes);
    this.addChild(retencion);
    return retencion;
  }

  public multiRetencion(...elementAttributes: Record<string, unknown>[]): Retenciones {
    elementAttributes.forEach((attributes) => {
      this.addRetencion(attributes);
    });
    return this;
  }
}
