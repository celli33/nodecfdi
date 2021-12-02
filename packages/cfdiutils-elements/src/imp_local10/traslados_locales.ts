import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class TrasladosLocales extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('implocal:TrasladosLocales', attributes, children);
  }

  public getElementName(): string {
    return 'implocal:TrasladosLocales';
  }
}
