import { CNodeInterface } from './c_node_interface';
import * as XmlDom from '@xmldom/xmldom';

export class XmlNodeExporter {
  public export(node: CNodeInterface): Element {
    const document = new XmlDom.DOMImplementation().createDocument('', '', null);
    const rootElement = this.exportRecursive(document, node);
    document.appendChild(rootElement);
    return rootElement;
  }

  private exportRecursive(document: Document, node: CNodeInterface): Element {
    const element = document.createElement(node.name());

    node.attributes().forEach((value, key) => {
      element.setAttribute(key, value);
    });

    node.children().forEach((child) => {
      const childElement = this.exportRecursive(document, child);
      element.appendChild(childElement);
    });

    return element;
  }
}
