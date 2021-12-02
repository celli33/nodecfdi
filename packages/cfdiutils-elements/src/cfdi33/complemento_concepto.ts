import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class ComplementoConcepto extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:ComplementoConcepto', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:ComplementoConcepto';
  }
}
