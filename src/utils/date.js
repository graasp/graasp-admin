import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (d) => {
  return moment(d).format('MMMM Do YYYY, h:mm:ss a');
};
