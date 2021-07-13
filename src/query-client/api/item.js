import { failOnError, DEFAULT_GET } from './utils';
import { ALL_ITEMS_ROUTE, buildGetItem } from './routes';

export const getItem = async ({ id }, { API_HOST }) => {
  const res = await fetch(`${API_HOST}/${buildGetItem(id)}`, {
    ...DEFAULT_GET,
  }).then(failOnError);
  return res.json();
};

export const getAllItems = async ({ API_HOST }) => {
  const res = await fetch(`${API_HOST}/${ALL_ITEMS_ROUTE}`, {
    ...DEFAULT_GET,
  }).then(failOnError);

  return res.json();
};
