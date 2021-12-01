import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { Traslado } from './traslado';

export class Traslados extends AbstractElement{
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Traslados', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Traslados';
  }

  public addTraslado(attributes: Record<string, unknown> = {}): Traslado {
    const traslado = new Traslado(attributes);
    this.addChild(traslado);
    return traslado;
  }

  public multiTraslado(...elementAttributes: Record<string, unknown>[]): Traslados {
    elementAttributes.forEach((attributes) => {
      this.addTraslado(attributes);
    });
    return this;
  }
}
