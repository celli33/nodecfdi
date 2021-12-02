import { AbstractElement } from '../common/abstract_element';
import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { RetencionesLocales } from './retenciones_locales';
import { TrasladosLocales } from './traslados_locales';

export class ImpuestosLocales extends AbstractElement {
  constructor(attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super('implocal:ImpuestosLocales', attributes, children);
  }

  public getElementName(): string {
    return 'implocal:ImpuestosLocales';
  }

  public addRetencionLocal(attributes: Record<string, unknown> = {}): RetencionesLocales {
    const retencion = new RetencionesLocales(attributes);
    this.addChild(retencion);
    return retencion;
  }

  public addTrasladoLocal(attributes: Record<string, unknown> = {}): TrasladosLocales {
    const traslado = new TrasladosLocales(attributes);
    this.addChild(traslado);
    return traslado;
  }

  public getChildrenOrder(): string[] {
    return ['implocal:RetencionesLocales', 'implocal:TrasladosLocales'];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:implocal': 'http://www.sat.gob.mx/implocal',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/implocal http://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd',
      version: '1.0',
    };
  }
}
