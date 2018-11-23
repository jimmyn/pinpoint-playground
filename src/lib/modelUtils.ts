import {Model, Query, Scan} from 'dynogels-promisified';
import {NotFound, UnprocessableEntity} from 'http-errors';
import {capitalize, decodeJSON, encodeJSON} from './utils';

/**
 * Gets an item from dynamoDB table
 * Throws a NotFound http error if item is not found
 * This is an example of functional approach to extending dynogels model functionality
 * @param model - dynogels Model
 */
export const getItem = (model: Model) => {
  return async (hashKey: string, rangeKey?: string) => {
    const item = await model.getAsync(hashKey, rangeKey);
    if (!item) {
      throw new NotFound(`${capitalize(model.config().name)} not found`);
    }
    return item;
  };
};

export type ListPaginatedParams = {
  from?: string;
  size: number;
};

export type ListPaginatedResult = {
  items: any[];
  next?: string;
};

/**
 * Gets items from dynamoDB table with cursor based pagination
 * @param query - dynogels Query or Scan
 */
export const listPaginated = (query: Query | Scan) => {
  return async ({from, size}: ListPaginatedParams): Promise<ListPaginatedResult> => {
    query = query.limit(size);

    if (from) {
      const [err, startKey] = decodeJSON(from);
      if (err) throw new UnprocessableEntity('Invalid "from" parameter');
      query = query.startKey(startKey);
    }

    const {Items, LastEvaluatedKey} = await query.execAsync();
    const result: ListPaginatedResult = {items: Items};

    if (LastEvaluatedKey) {
      result.next = encodeJSON(LastEvaluatedKey);
    }

    return result;
  };
};
