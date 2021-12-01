import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { CfdiRelacionado } from './cfdi_relacionado';

export class CfdiRelacionados extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:CfdiRelacionados', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:CfdiRelacionados';
  }

  public addCfdiRelacionado(attributes: Record<string, unknown> = {}): CfdiRelacionado {
    const cfdiRelacionado = new CfdiRelacionado(attributes);
    this.addChild(cfdiRelacionado);
    return cfdiRelacionado;
  }

  public multiCfdiRelacionado(elementAttributes: Record<string, unknown>[] = []): CfdiRelacionados {
    elementAttributes.forEach((attributes) => {
      this.addCfdiRelacionado(attributes);
    });
    return this;
  }
}
