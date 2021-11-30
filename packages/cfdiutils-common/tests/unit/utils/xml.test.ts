import { Xml } from '../../../src/utils/xml';

describe('Utils.Xml', () => {
  test.each([['First_Name'], ['_4-lane'], ['tél'], ['month-day']])('true on valid names', (name) => {
    expect(Xml.isValidXmlName(name)).toBeTruthy();
  });

  test.each([['Driver´s_License'], ['month/day'], ['first name'], ['4-lane']])('false on invalid names', (name) => {
    expect(Xml.isValidXmlName(name)).toBeFalsy();
  });
});
