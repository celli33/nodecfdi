import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { Concepto } from './concepto';

export class Conceptos extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Conceptos', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Conceptos';
  }

  public addConcepto(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []): Concepto {
    const concepto = new Concepto(attributes, children);
    this.addChild(concepto);
    return concepto;
  }
}
