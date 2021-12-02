import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export class RetencionesLocales extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('implocal:RetencionesLocales', attributes, children);
  }

  public getElementName(): string {
    return 'implocal:RetencionesLocales';
  }
}
