import { CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { InformacionAduanera } from '../informacion-aduanera';

export abstract class InformacionAduaneraTrait {
  abstract addChild(node: CNodeInterface): CNodeInterface;

  public addInformacionAduanera(attributes: Record<string, unknown> = {}): InformacionAduanera {
    const informacionAduanera = new InformacionAduanera(attributes);
    this.addChild(informacionAduanera);
    return informacionAduanera;
  }

  public multiInformacionAduanera(...elementAttributes: Record<string, unknown>[]): this {
    elementAttributes.forEach((attributes) => {
      this.addInformacionAduanera(attributes);
    });
    return this;
  }
}
