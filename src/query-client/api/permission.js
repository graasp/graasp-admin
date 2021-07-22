import { ALL_PERMISSIONS_ROUTE } from './routes';
import { DEFAULT_GET, failOnError } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllPermissions = async ({ API_HOST }) => {
  const res = await fetch(`${API_HOST}/${ALL_PERMISSIONS_ROUTE}`, {
    ...DEFAULT_GET,
  }).then(failOnError);

  return res.json();
};
