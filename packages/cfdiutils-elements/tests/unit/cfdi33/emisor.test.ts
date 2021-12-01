import { Emisor } from '../../../src/cfdi33';

describe('Elements.Cfdi33.Emisor', () => {
  test('get element name', () => {
    const element = new Emisor();
    expect(element.name()).toBe('cfdi:Emisor');
    expect(element.getElementName()).toBe('cfdi:Emisor');
  });
});
