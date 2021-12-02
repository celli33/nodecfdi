import { UseInformacionAduanera } from './use_informacion_aduanera';
import { InformacionAduanera } from '../../../../src/cfdi33';

describe('Elements.Cfdi33.Trait.InformacionAduaneraTrait', () => {
  test('add informacion aduanera', () => {
    // no child's
    const node = new UseInformacionAduanera('X');
    expect(node.count()).toBe(0);

    // add first child
    const first = node.addInformacionAduanera({
      name: 'first',
    });
    expect(first).toBeInstanceOf(InformacionAduanera);
    expect(first.attributes().get('name')).toBe('first');
    expect(node.count()).toBe(1);

    // add second child
    node.addInformacionAduanera();
    expect(node.count()).toBe(2);
  });

  test('multi informacion aduanera', () => {
    const node = new UseInformacionAduanera('X');
    expect(node.count()).toBe(0);
    const multiReturn = node.multiInformacionAduanera({ id: 'first' }, { id: 'second' });
    expect(node).toStrictEqual(multiReturn);
    expect(node.count()).toBe(2);
    expect(node.searchAttribute('cfdi:InformacionAduanera', 'id')).toBe('first');
  });
});
