import { Retencion } from '../../../src/cfdi33';

describe('Elements.Cfdi33.Retencion', () => {
  test('get element name', () => {
    const element = new Retencion();
    expect(element.name()).toBe('cfdi:Retencion');
    expect(element.getElementName()).toBe('cfdi:Retencion');
  });
});
