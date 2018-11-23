import base64url from 'base64-url';

/**
 * Capitalizes a string
 * @param str
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Decodes JSON base64 string and returns a parsed JSON
 * @param input
 */
export function decodeJSON<T>(input: string): [Error | undefined, T | undefined] {
  try {
    return [undefined, JSON.parse(base64url.decode(input)) as T];
  } catch (error) {
    return [new Error('Invalid input string'), undefined];
  }
}

/**
 * Encodes JSON to base64 string
 * @param input
 */
export function encodeJSON(input: object): string {
  return base64url.encode(JSON.stringify(input));
}

/**
 * Excludes keys from the object
 * returns a new object
 * @param source
 * @param keys
 */
export function excludeKeys(source: {[key: string]: any}, keys: string[]) {
  const copy: {[key: string]: any} = {};
  Object.keys(source).forEach(key => {
    if (!keys.includes(key)) copy[key] = source[key];
  });
  return copy;
}
