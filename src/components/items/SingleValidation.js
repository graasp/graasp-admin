import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import {
  makeStyles,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { Loader } from '@graasp/ui';
import { buildItemPath } from '../../config/paths';
import { hooks } from '../../config/queryClient';
import { VALIDATION_TEXTFIELD_WIDTH } from '../../config/constants';

const { useItemValidationGroups, useItemValidationStatuses } = hooks;

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 'auto',
  },
  textfield: {
    minWidth: VALIDATION_TEXTFIELD_WIDTH,
  },
}));

const SingleValidation = () => {
  const [reason, setReason] = React.useState(null);

  const classes = useStyles();
  const { t } = useTranslation();
  const match = useRouteMatch(buildItemPath());
  const itemId = match?.params?.itemId;
  const validationId = match?.params?.validationId;
  const reviewId = match?.params?.reviewId;

  // get itemValidationGroups of given validationId
  const {
    data: ivGroups,
    isLoading: ivGroupsLoading,
  } = useItemValidationGroups(validationId);

  // get map of item validation and review statuses
  const { data: ivStatuses } = useItemValidationStatuses();
  const ivStatusesMap = new Map(
    ivStatuses?.map((entry) => [entry?.id, entry?.name]),
  );

  // TODO: get a map of process id to process name

  if (ivGroupsLoading) {
    return <Loader />;
  }

  // convert statusId to status name
  // TODO also add an entry of process name using process id map
  const itemValidationGroups = ivGroups?.map((ivGroup) => {
    const newEntry = {
      status: ivStatusesMap.get(ivGroup?.statusId),
      ...ivGroup,
    };
    return newEntry;
  });

  const handleViewItem = () => {
    const url = buildItemPath(itemId);
    window.open(url, '_blank').focus();
  };

  const handleInput = (event) => {
    setReason(event.target.value);
  };
  const updateReview = (status) => () => {
    // TODO
    // update item-validation-review with new status and reason(optional)
    // status is either 'accept' or 'reject'
    // updateReview(reviewId, status, reason);
    console.log(reviewId, status, reason);
  };

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        {t('Validation Records')}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Process</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Updated At</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemValidationGroups?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.process}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.updatedAt}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button
          variant="contained"
          onClick={handleViewItem}
          className={classes.button}
          color="primary"
        >
          View Item
        </Button>
      </div>
      <TextField
        variant="outlined"
        label="(Optional) To specify reasons: "
        onChange={handleInput}
        className={classes.textfield}
      />
      <div>
        <Button
          variant="contained"
          color="default"
          onClick={updateReview('accept')}
          className={classes.button}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={updateReview('reject')}
          className={classes.button}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};
export default SingleValidation;
