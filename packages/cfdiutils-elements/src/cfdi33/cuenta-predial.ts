import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class CuentaPredial extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:CuentaPredial', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:CuentaPredial';
  }
}
