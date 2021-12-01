import { AbstractElement } from '../common/abstract-element';
import { use } from 'typescript-mix';
import { InformacionAduaneraTrait } from './traits/informacion-aduanera-trait';
import { ImpuestosTrait } from './traits/impuestos-trait';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { ConceptoImpuestos } from './concepto-impuestos';
import { CuentaPredial } from './cuenta-predial';
import { ComplementoConcepto } from './complemento-concepto';
import { Parte } from './parte';

interface Concepto extends AbstractElement, InformacionAduaneraTrait, ImpuestosTrait {}

class Concepto extends AbstractElement {
  @use(InformacionAduaneraTrait, ImpuestosTrait) this;

  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Concepto', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Concepto';
  }

  public getChildrenOrder(): string[] {
    return [
      'cfdi:Impuestos',
      'cfdi:InformacionAduanera',
      'cfdi:CuentaPredial',
      'cfdi:ComplementoConcepto',
      'cfdi:Parte',
    ];
  }

  public getImpuestos(): ConceptoImpuestos {
    return this.helperGetOrAdd(new ConceptoImpuestos());
  }

  public getCuentaPredial(): CuentaPredial {
    return this.helperGetOrAdd(new CuentaPredial());
  }

  public addCuentaPredial(attributes: Record<string, unknown> = {}): CuentaPredial {
    const cuentaPredial = this.getCuentaPredial();
    cuentaPredial.addAttributes(attributes);
    return cuentaPredial;
  }

  public getComplementoConcepto(): ComplementoConcepto {
    return this.helperGetOrAdd(new ComplementoConcepto());
  }

  public addComplementoConcepto(
    attributes: Record<string, unknown> = {},
    children: CNodeInterface[] = []
  ): ComplementoConcepto {
    const complementoConcepto = this.getComplementoConcepto();
    complementoConcepto.addAttributes(attributes);
    complementoConcepto.children().importFromArray(children);
    return complementoConcepto;
  }

  public addParte(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []): Parte {
    const parte = new Parte(attributes, children);
    this.addChild(parte);
    return parte;
  }

  public multiParte(...elementAttributes: Record<string, unknown>[]): this {
    elementAttributes.forEach((attributes) => {
      this.addParte(attributes);
    });
    return this;
  }
}

export { Concepto };
