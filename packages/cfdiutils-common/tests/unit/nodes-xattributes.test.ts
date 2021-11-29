import { XAttributes } from '../../src';

describe('Nodes.XAttributes', () => {
  test('construct without arguments', () => {
    const attributes = new XAttributes();
    expect(attributes.count()).toBe(0);
  });

  test('construct with members', () => {
    const data = {
      id: 'sample',
      foo: 'bar',
    };
    const attributes = new XAttributes(data);
    expect(attributes.count()).toBe(2);
    Object.entries(data).forEach(([key, value]) => {
      expect(attributes.exists(key)).toBeTruthy();
      expect(attributes.get(key)).toBe(value);
    });
  });

  test.each([
    ['empty', ''],
    ['white space', '    '],
  ])('set method with invalid name %s', (opt, name) => {
    const attributes = new XAttributes();
    expect.assertions(1);
    try {
      attributes.set(name, '');
    } catch (e) {
      expect(e).toBeInstanceOf(SyntaxError);
    }
  });

  test('set method', () => {
    const attributes = new XAttributes();
    // first
    attributes.set('foo', 'bar');
    expect(attributes.count()).toBe(1);
    expect(attributes.get('foo')).toBe('bar');
    // second
    attributes.set('lorem', 'ipsum');
    expect(attributes.count()).toBe(2);
    expect(attributes.get('lorem')).toBe('ipsum');
    // override
    attributes.set('foo', 'BAR');
    expect(attributes.count()).toBe(2);
    expect(attributes.get('foo')).toBe('BAR');
  });

  test.each([
    ['empty', ''],
    ['white space', ' '],
    ['digit', '0'],
    ['digit hyphen text', '0-foo'],
    ['hyphen', '-'],
    ['hyphen text', '-x'],
    ['inner space', 'foo bar'],
  ])('set with invalid names (%s)', (opt, name) => {
    const attributes = new XAttributes();
    expect(() => attributes.set(name, '')).toThrow('invalid xml name');
  });

  test('get method on non existent', () => {
    const attributes = new XAttributes();
    expect(attributes.get('foo')).toBe('');
  });

  test('remove', () => {
    const attributes = new XAttributes();
    attributes.set('foo', 'bar');

    attributes.remove('bar');
    expect(attributes.count()).toBe(1);

    attributes.remove('foo');
    expect(attributes.count()).toBe(0);
  });

  test('array access', () => {
    const attributes = new XAttributes();
    attributes.exportRecord()['id'] = 'sample';
    attributes.exportRecord()['foo'] = 'foo foo foo';
    attributes.exportRecord()['foo'] = 'bar'; // Override
    attributes.exportRecord()['empty'] = '';
    expect(attributes.count()).toBe(3);
    // existent
    expect(attributes.exportRecord()['empty']).not.toBeUndefined();
    expect(attributes.exportRecord()['id']).not.toBeUndefined();
    expect(attributes.exportRecord()['id']).toBe('sample');
    expect(attributes.exportRecord()['foo']).toBe('bar');
    // non existent
    expect(attributes.exportRecord()['non-existent']).toBeUndefined();
    // remove and check
    delete attributes.exportRecord()['foo'];
    expect(attributes.exportRecord()['foo']).toBeUndefined();
  });

  test('iterator', () => {
    const data = {
      foo: 'bar',
      lorem: 'ipsum',
    };
    const created: Record<string, string> = {};
    const attributes = new XAttributes(data);
    attributes.getEntries().forEach(([key, value]) => {
      created[key] = value;
    });
    expect(created).toStrictEqual(data);
  });

  test('set to (undefined|null) perform remove', () => {
    const attributes = new XAttributes({
      foo: 'bar',
      bar: 'foo',
    });
    expect(attributes.exists('foo')).toBeTruthy();
    expect(attributes.exists('bar')).toBeTruthy();
    attributes.exportRecord()['foo'] = undefined;
    expect(attributes.exists('foo')).toBeFalsy();
    attributes.exportRecord()['bar'] = null;
    expect(attributes.exists('bar')).toBeFalsy();
  });

  test('import with (undefined|null) perform remove', () => {
    const attributes = new XAttributes({
      set: '1',
      importArray: '1',
      offsetSet: '1',
      constructor: undefined,
      empty: null,
    });
    expect(attributes.count()).toBe(3);
    expect(attributes.exists('constructor')).toBeFalsy();
    expect(attributes.exists('empty')).toBeFalsy();
    expect(attributes.count()).toBe(3);

    attributes.set('set', undefined);
    expect(attributes.exists('set')).toBeFalsy();
    expect(attributes.count()).toBe(2);

    attributes.importRecord({ importArray: undefined });
    expect(attributes.exists('importArray')).toBeFalsy();
    expect(attributes.count()).toBe(1);

    attributes.exportRecord()['offsetSet'] = null;
    expect(attributes.exists('offsetSet')).toBeFalsy();
    expect(attributes.count()).toBe(0);
  });

  test('import with invalid value', () => {
    expect(
      () =>
        new XAttributes({
          foo: [],
        })
    ).toThrow('Cannot convert value of attribute foo to string');
  });

  test('set with object to string', () => {
    const expectedValue = 'foo';

    function Foo(value: string) {
      this.value = value;
    }

    const toStringObject = new Foo('foo');

    Foo.prototype.toString = function () {
      return this.value;
    };

    const attributes = new XAttributes({
      constructor: toStringObject,
    });
    attributes.exportRecord()['offsetSet'] = `${toStringObject}`;
    attributes.set('set', toStringObject);
    attributes.importRecord({
      importArray: toStringObject,
    });
    expect(attributes.get('constructor')).toBe(expectedValue);
    expect(attributes.get('offsetSet')).toBe(expectedValue);
    expect(attributes.get('set')).toBe(expectedValue);
    expect(attributes.get('importArray')).toBe(expectedValue);
  });

  test('export record', () => {
    const attributes = new XAttributes();
    attributes.set('foo', 'bar');

    expect(attributes.exportRecord()).toStrictEqual({
      foo: 'bar',
    });
  });

  test('remove all', () => {
    const attributes = new XAttributes({
      foo: 'bar',
      bar: 'foo',
    });
    expect(attributes.exists('foo')).toBeTruthy();
    expect(attributes.exists('bar')).toBeTruthy();
    attributes.removeAll();
    expect(attributes.exists('foo')).toBeFalsy();
    expect(attributes.exists('bar')).toBeFalsy();
    expect(attributes.count()).toBe(0);
  });
});
