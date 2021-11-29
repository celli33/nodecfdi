import { Xml } from '../utils/xml';

export class Attributes {
  private attributes: Record<string, string> = {};

  constructor(attributes?: Record<string, unknown>) {
    this.importRecord(attributes);
  }

  public get(name: string): string {
    if (!this.exists(name)) {
      return '';
    }
    return this.attributes[name];
  }

  /**
   * Set a value in the collection
   *
   * @param name
   * @param value If (null or undefined) then it will remove the value instead of setting to empty string
   */
  public set(name: string, value?: unknown): this {
    if (value === null || value === undefined) {
      this.remove(name);
      return this;
    }
    if (!Xml.isValidXmlName(name)) {
      throw new SyntaxError(`Cannot set attribute with an invalid xml name: ${name}`);
    }
    this.attributes[name] = value.toString();
    return this;
  }

  public remove(name: string): this {
    delete this.attributes[name];
    return this;
  }

  public removeAll(): this {
    this.attributes = {};
    return this;
  }

  public exists(name: string): boolean {
    if (this.attributes[name] === undefined || this.attributes[name] === null) {
      this.remove(name);
    }
    // eslint-disable-next-line no-prototype-builtins
    return this.attributes.hasOwnProperty(name);
  }

  public importRecord(attributes?: Record<string, unknown>): this {
    if (attributes)
      Object.entries(attributes).forEach(([key, value]) => {
        const fixedValue = Attributes.castValueToString(key, value);
        this.set(key, fixedValue);
      });
    return this;
  }

  public exportRecord(): Record<string, unknown> {
    return this.attributes;
  }

  /**
   * Cast any value to string
   *
   * @param key
   * @param value
   * @private
   */
  private static castValueToString(key: string, value: unknown): null | string {
    if (value === null || value === undefined) {
      return null;
    }
    if (/boolean|number|string/.test(typeof value)) {
      return value.toString();
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      return value.toString();
    }
    throw new SyntaxError(`Cannot convert value of attribute ${key} to string`);
  }

  public getEntries(): [string, string][] {
    return Object.entries(this.attributes);
  }

  public count(): number {
    return this.getEntries().length;
  }
}
