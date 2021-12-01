import { Addenda } from '../../../src/cfdi33';
import { CNode } from '@nodecfdi/cfdiutils-common';

describe('Elements.Cfdi33.Addenda', () => {
  test('get element name', () => {
    const element = new Addenda();
    expect(element.name()).toBe('cfdi:Addenda');
    expect(element.getElementName()).toBe('cfdi:Addenda');
  });

  test('add', () => {
    const element = new Addenda();
    expect(element.count()).toBe(0);

    const firstChild = new CNode('first');
    const addReturn = element.add(firstChild);
    expect(element).toStrictEqual(addReturn);
    expect(element.count()).toBe(1);
    expect(element.searchNode('first')).toStrictEqual(firstChild);

    const secondChild = new CNode('second');
    element.add(secondChild);
    expect(element.count()).toBe(2);
    expect(JSON.stringify(element.searchNode('second'))).toStrictEqual(JSON.stringify(secondChild));
  });
});
