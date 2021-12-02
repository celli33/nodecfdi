import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { use } from 'typescript-mix';
import { ImpuestosTrait } from './traits/impuestos_trait';
import { CfdiRelacionados } from './cfdi_relacionados';
import { CfdiRelacionado } from './cfdi_relacionado';
import { Emisor } from './emisor';
import { Receptor } from './receptor';
import { Conceptos } from './conceptos';
import { Concepto } from './concepto';
import { Impuestos } from './impuestos';
import { Complemento } from './complemento';
import { Addenda } from './addenda';

interface Comprobante extends AbstractElement, ImpuestosTrait {}

class Comprobante extends AbstractElement {
  @use(ImpuestosTrait) this: unknown;

  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('cfdi:Comprobante', attributes, children);
  }

  public getElementName(): string {
    return 'cfdi:Comprobante';
  }

  public getCfdiRelacionados(): CfdiRelacionados {
    return this.helperGetOrAdd(new CfdiRelacionados());
  }

  public addCfdiRelacionados(attributes: Record<string, unknown> = {}): CfdiRelacionados {
    const cfdiRelacionados = this.getCfdiRelacionados();
    cfdiRelacionados.addAttributes(attributes);
    return cfdiRelacionados;
  }

  public addCfdiRelacionado(attributes: Record<string, unknown> = {}): CfdiRelacionado {
    return this.getCfdiRelacionados().addCfdiRelacionado(attributes);
  }

  public multiCfdiRelacionado(...elementAttributes: Record<string, unknown>[]): Comprobante {
    this.getCfdiRelacionados().multiCfdiRelacionado(elementAttributes);
    return this;
  }

  public getEmisor(): Emisor {
    return this.helperGetOrAdd(new Emisor());
  }

  public addEmisor(attributes: Record<string, unknown> = {}): Emisor {
    const emisor = this.getEmisor();
    emisor.addAttributes(attributes);
    return emisor;
  }

  public getReceptor(): Receptor {
    return this.helperGetOrAdd(new Receptor());
  }

  public addReceptor(attributes: Record<string, unknown>): Receptor {
    const receptor = this.getReceptor();
    receptor.addAttributes(attributes);
    return receptor;
  }

  public getConceptos(): Conceptos {
    return this.helperGetOrAdd(new Conceptos());
  }

  public addConcepto(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []): Concepto {
    return this.getConceptos().addConcepto(attributes, children);
  }

  public getImpuestos(): Impuestos {
    return this.helperGetOrAdd(new Impuestos());
  }

  public addImpuestos(attributes: Record<string, unknown> = {}): Impuestos {
    const impuestos = this.getImpuestos();
    impuestos.addAttributes(attributes);
    return impuestos;
  }

  public getComplemento(): Complemento {
    return this.helperGetOrAdd(new Complemento());
  }

  public addComplemento(children: CNodeInterface): Comprobante {
    this.getComplemento().add(children);
    return this;
  }

  public getAddenda(): Addenda {
    return this.helperGetOrAdd(new Addenda());
  }

  public addAddenda(children: CNodeInterface): Comprobante {
    this.getAddenda().add(children);
    return this;
  }

  public getChildrenOrder(): string[] {
    return [
      'cfdi:CfdiRelacionados',
      'cfdi:Emisor',
      'cfdi:Receptor',
      'cfdi:Conceptos',
      'cfdi:Impuestos',
      'cfdi:Complemento',
      'cfdi:Addenda',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:cfdi': 'http://www.sat.gob.mx/cfd/3',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd',
      Version: '3.3',
    };
  }
}

export { Comprobante };
