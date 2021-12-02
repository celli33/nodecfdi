import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class Retencion extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('pago10:Retencion', attributes, children);
  }

  public getElementName(): string {
    return 'pago10:Retencion';
  }
}
