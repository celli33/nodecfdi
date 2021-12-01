import { AbstractElement } from '../../../../src/common/abstract-element';
import { use } from 'typescript-mix';
import { ImpuestosTrait } from '../../../../src/cfdi33/traits/impuestos-trait';
import { Impuestos } from '../../../../src/cfdi33/impuestos';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

interface UseImpuestos extends ImpuestosTrait, AbstractElement {}

class UseImpuestos extends AbstractElement {
  @use(ImpuestosTrait) this: unknown;

  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('X', attributes, children);
  }

  public getImpuestos(): Impuestos {
    return this.helperGetOrAdd(new Impuestos());
  }

  public getElementName(): string {
    return 'X';
  }
}

export { UseImpuestos };
