import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class Addenda extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Addenda', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Addenda';
  }

  public add(child: CNodeInterface): Addenda {
    this.children().add(child);
    return this;
  }
}
