import { Ordering } from '@/enums/orderingTypes';

/**
 * Custom sorting function depending on a given property name
 */
export const descendingComparator = <T, K extends keyof T>(
  a: T,
  b: T,
  orderBy: K,
): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

type ComparatorFunc<T> = (a: T, b: T) => number;
/**
 * Return a comparator function depending on the order and the field
 * @param {string} order ascending or descending order
 * @param {string} orderBy property name used when sorting
 * @returns {function(): number}
 */
export const getComparator = <T, K extends keyof T>(
  order: Ordering,
  orderBy: K,
): ComparatorFunc<T> =>
  order === Ordering.Desc
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

/**
 * Returns array sorted given a comparator function
 * @param {array} array
 * @param {function(): number} comparator
 * @returns {array}
 */
export const stableSort = <T>(
  array: T[],
  comparator: ComparatorFunc<T>,
): T[] => {
  let stabilizedThis = array.map((el, index): [T, number] => [el, index]);
  stabilizedThis = stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

/**
 * Returns the correct portion of array given the current page number
 */
export const getRowsForPage = <T>(
  table: T[],
  { page, rowsPerPage }: { page: number; rowsPerPage: number },
): T[] => table.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
