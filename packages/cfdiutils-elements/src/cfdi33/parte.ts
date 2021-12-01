import { AbstractElement } from '../common/abstract-element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { use } from 'typescript-mix';
import { InformacionAduaneraTrait } from './traits/informacion-aduanera-trait';

interface Parte extends AbstractElement, InformacionAduaneraTrait {}

class Parte extends AbstractElement {
  @use(InformacionAduaneraTrait) this;

  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Parte', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Parte';
  }
}

export { Parte };
