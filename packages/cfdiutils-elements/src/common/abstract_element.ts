import { CNode, CNodeInterface } from '@nodecfdi/cfdiutils-common';
import { ElementInterface } from './element_interface';

export abstract class AbstractElement extends CNode implements ElementInterface {
  protected constructor(name: string, attributes: Record<string, unknown> = {}, children: CNodeInterface[] = []) {
    super(name, {}, children);
    this.children().setOrder(this.getChildrenOrder());
    this.attributes().importRecord({
      ...this.getFixedAttributes(),
      ...attributes,
    });
  }

  public getChildrenOrder(): string[] {
    return [];
  }

  abstract getElementName(): string;

  public getFixedAttributes(): Record<string, string> {
    return {};
  }

  protected helperGetOrAdd<T extends AbstractElement>(element: T): T {
    const retrieved = this.searchNode(element.getElementName());
    if (retrieved) {
      return retrieved as T;
    }
    this.addChild(element);
    return element;
  }
}
