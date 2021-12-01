import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class Receptor extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Receptor', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Receptor';
  }
}
