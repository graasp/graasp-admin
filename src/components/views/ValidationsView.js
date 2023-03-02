import React from 'react';
import { Loader } from '@graasp/ui';

import { buildValidationPath } from '../../config/paths';
import { TABLE_TYPES, ValidationCell } from '../../config/constants';
import ValidationTable from '../common/ValidationTable';
import { useAllValidationReviews } from '../../config/mock';

// TODO: this hook does not exist yet

// const useStyles = makeStyles(() => ({
// }));

const ValidationsView = () => {
  // const classes = useStyles();
  // const { data: allValidationReviews, isLoading } = useAllValidationReviews();
  const { data: allValidationReviews, isLoading } = useAllValidationReviews();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ValidationTable
      link={buildValidationPath}
      tableType={TABLE_TYPES.VALIDATION}
      headCells={ValidationCell}
      tableTitle="All Pending Validation Reviews"
      rows={allValidationReviews}
      checkBox
      empty
      search
      title
    />
  );
};

export default ValidationsView;
