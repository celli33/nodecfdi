import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class InformacionAduanera extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:InformacionAduanera', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:InformacionAduanera';
  }
}
