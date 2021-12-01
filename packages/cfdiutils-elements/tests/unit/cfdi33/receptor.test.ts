import { Receptor } from '../../../src/cfdi33/receptor';

describe('Elements.Cfdi33.Receptor', () => {
  test('get element name', () => {
    const element = new Receptor();
    expect(element.name()).toBe('cfdi:Receptor');
    expect(element.getElementName()).toBe('cfdi:Receptor');
  });
});
