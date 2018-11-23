import {capitalize, decodeJSON, encodeJSON, excludeKeys} from './utils';

describe('Utils', () => {
  test('capitalize', () => {
    expect(capitalize('foo')).toBe('Foo');
  });

  test('decodeBase64JSON should decode base64 string', () => {
    const [error, result] = decodeJSON('eyJmb28iOiJiYXIifQ');
    expect(error).toBeUndefined();
    expect(result).toEqual({foo: 'bar'});
  });

  test('decodeBase64JSON should return an error if input is invalid', () => {
    const [error, result] = decodeJSON('eyJmb28iOiYXIifQ==');
    expect(error).toBeInstanceOf(Error);
    expect(error!.message).toBe('Invalid input string');
    expect(result).toBeUndefined();
  });

  test('encodeBase64JSON should encode base64 string', () => {
    expect(encodeJSON({foo: 'bar'})).toEqual('eyJmb28iOiJiYXIifQ');
  });

  test('excludeKeys should work correctly', () => {
    expect(excludeKeys({foo: 'bar', extra: 'key', other: 'prop'}, ['extra'])).toEqual({
      foo: 'bar',
      other: 'prop'
    });
  });
});
