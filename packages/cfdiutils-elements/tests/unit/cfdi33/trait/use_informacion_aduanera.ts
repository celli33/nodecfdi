import { CNode } from '@nodecfdi/cfdiutils-common';
import { use } from 'typescript-mix';
import { InformacionAduaneraTrait } from '../../../../src/cfdi33/traits/informacion_aduanera-trait';

interface UseInformacionAduanera extends CNode, InformacionAduaneraTrait {}

class UseInformacionAduanera extends CNode {
  @use(InformacionAduaneraTrait) this;
}

export { UseInformacionAduanera };
