import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class Retencion extends AbstractElement{
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Retencion', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Retencion';
  }
}
