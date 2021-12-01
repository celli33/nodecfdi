import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class Complemento extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Complemento', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Complemento';
  }

  public add(child: CNodeInterface): Complemento {
    this.children().add(child);
    return this;
  }
}
