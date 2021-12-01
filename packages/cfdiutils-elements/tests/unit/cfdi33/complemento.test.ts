import { Complemento } from '../../../src/cfdi33';
import { CNode } from '@nodecfdi/cfdiutils-common';

describe('Elements.Cfdi33.Complemento', () => {
  test('get element name', () => {
    const element = new Complemento();
    expect(element.name()).toBe('cfdi:Complemento');
    expect(element.getElementName()).toBe('cfdi:Complemento');
  });

  test('add', () => {
    const element = new Complemento();
    expect(element.count()).toBe(0);

    const firstChild = new CNode('first');
    const addReturn = element.add(firstChild);
    expect(element).toStrictEqual(addReturn);
    expect(element.count()).toBe(1);
    expect(element.searchNode('first')).toStrictEqual(firstChild);

    const secondChild = new CNode('second');
    element.add(secondChild);
    expect(element.count()).toBe(2);
    expect(element.searchNode('second')).toStrictEqual(secondChild);
  });
});
