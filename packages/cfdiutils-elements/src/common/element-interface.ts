import { CNodeInterface } from '@nodecfdi/cfdiutils-common';

export interface ElementInterface extends CNodeInterface {
  getElementName(): string;

  getFixedAttributes(): Record<string, string>;

  getChildrenOrder(): string[];
}
