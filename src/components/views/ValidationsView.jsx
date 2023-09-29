import { Loader } from '@graasp/ui';

import { TABLE_TYPES, ValidationCell } from '../../config/constants';
import { useAllValidationReviews } from '../../config/mock';
import { buildValidationPath } from '../../config/paths';
import ValidationTable from '../common/ValidationTable';

const ValidationsView = () => {
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
