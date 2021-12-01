import { CfdiRelacionado } from '../../../src/cfdi33';

describe('Elements.Cfdi33.CfdiRelacionado', () => {
  test('get element name', () => {
    const element = new CfdiRelacionado();
    expect(element.name()).toBe('cfdi:CfdiRelacionado');
    expect(element.getElementName()).toBe('cfdi:CfdiRelacionado');
  });
});
