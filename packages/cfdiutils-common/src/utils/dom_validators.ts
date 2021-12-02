export class DomValidators {
  public static isElement(nodo: Node): nodo is Element {
    return nodo.nodeType === 1;
  }

  public static isAttr(nodo: Node): nodo is Attr {
    return nodo.nodeType === 2;
  }

  public static isText(nodo: Node): nodo is Text {
    return nodo.nodeType === 3;
  }

  public static isDocument(nodo: Node): nodo is Document {
    return nodo.nodeType === 9;
  }
}
