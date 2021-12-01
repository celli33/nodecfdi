import { Parte } from '../../../src/cfdi33';

describe('Elements.Cfdi33.Parte', () => {
  test('get element name', () => {
    const element = new Parte();
    expect(element.name()).toBe('cfdi:Parte');
    expect(element.getElementName()).toBe('cfdi:Parte');
  });
});
