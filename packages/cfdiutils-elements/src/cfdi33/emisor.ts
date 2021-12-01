import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class Emisor extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Emisor', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Emisor';
  }
}
