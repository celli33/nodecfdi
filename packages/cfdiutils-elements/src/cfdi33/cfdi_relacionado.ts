import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class CfdiRelacionado extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:CfdiRelacionado', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:CfdiRelacionado';
  }
}
