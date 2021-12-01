import { CfdiRelacionado, CfdiRelacionados } from '../../../src/cfdi33';

describe('Elements.Cfdi33.CfdiRelacionados', () => {
  test('get element name', () => {
    const element = new CfdiRelacionados();
    expect(element.name()).toBe('cfdi:CfdiRelacionados');
    expect(element.getElementName()).toBe('cfdi:CfdiRelacionados');
  });

  test('add cfdi relacionado', () => {
    const element = new CfdiRelacionados();
    // no child's
    expect(element.count()).toBe(0);

    // add first child
    const first = element.addCfdiRelacionado({
      name: 'first',
    });
    expect(first).toBeInstanceOf(CfdiRelacionado);
    expect(first.attributes().get('name')).toBe('first');
    expect(element.count()).toBe(1);

    // add second child
    const second = element.addCfdiRelacionado();
    expect(element.count()).toBe(2);

    // test that first and second are not the same
    expect(first.attributes().get('name')).not.toBe(second.attributes().get('name'));
  });
});
