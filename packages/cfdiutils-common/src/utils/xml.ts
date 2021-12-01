export class Xml {
  public static isValidXmlName(name: string) : boolean {
    if (name === '') return false;
    return /^[\p{L}_:][\p{L}\d_:.-]*$/u.test(name);
  }
}
