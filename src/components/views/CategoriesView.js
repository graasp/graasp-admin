import React, { useState } from 'react';
import { Loader } from '@graasp/ui';
import {
  makeStyles,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material//Save';
import { hooks } from '../../config/queryClient';
import {
  CATEGORY_BUTTON_HEIGHT,
  CATEGORY_CHIP_HEIGHT,
  CATEGORY_SELECT_WIDTH,
} from '../../config/constants';
import ConfirmationDialog from '../common/ConfirmationDialog';

const { useCategoryTypes, useCategories } = hooks;

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
  },
  chip: {
    fontSize: 'large',
    height: CATEGORY_CHIP_HEIGHT,
    width: 'auto',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  wrapper: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
    height: CATEGORY_BUTTON_HEIGHT,
  },
  input: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  textfield: {
    marginRight: theme.spacing(2),
  },
  select: {
    width: CATEGORY_SELECT_WIDTH,
  },
}));

const CategoriesView = () => {
  const classes = useStyles();
  const { data: allCategoryTypes, isLoading } = useCategoryTypes();
  const { data: allCateogories } = useCategories();

  const categoriesByTypes = allCateogories?.groupBy(
    (category) => category?.type,
  );

  const [newCategoryType, setNewCategoryType] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
  const [selectedCategoryType, setSelectedCategoryType] = useState(null);
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState(false);
  const [id, setId] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  // eslint-disable-next-line no-multi-assign
  const handleDelete = () => {
    switch (table) {
      case 'category_type':
        // TODO: use mutation deleteCategoryType(id)
        console.log(id, table);
        break;
      case 'category':
        // TODO: use mutation deleteCategory(id)
        console.log(id, table);
        break;
      default:
        break;
    }
    // close dialog
    setOpen(false);
  };

  const handleDeleteButtonClick = (entryId, tableName) => () => {
    // set id and table name of the entry to be deleted
    setTable(tableName);
    setId(entryId);
    // open confirmation dialog
    setOpen(true);
  };

  const handleSelect = (event) => {
    setSelectedCategoryType(event.target.value);
  };

  const handleChangeType = (event) => {
    setNewCategoryType(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const addCategoryType = () => {
    // TODO: use mutation addCategoryType(name)
    console.log(newCategoryType);
  };

  const addCategory = () => {
    // TODO: use mutation addCategory(name, typeId)
    console.log(newCategory);
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h5" className={classes.title}>
          Category Types
        </Typography>
        {allCategoryTypes?.map((type) => (
          <Chip
            label={type?.name}
            onDelete={handleDeleteButtonClick(type.id, 'category_type')}
            className={classes.chip}
            color="primary"
          />
        ))}
      </div>
      <div className={classes.input}>
        <TextField
          variant="outlined"
          label="Add new category type: "
          onChange={handleChangeType}
          className={classes.textfield}
        />
        <Button
          variant="contained"
          onClick={addCategoryType}
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
      <Typography variant="h5" className={classes.title}>
        Categories
      </Typography>
      {allCategoryTypes?.map((type) => (
        <div className={classes.wrapper}>
          <Typography variant="h6" className={classes.title}>
            {type?.name}
          </Typography>
          {categoriesByTypes?.get(type?.id)?.map((category) => (
            <Chip
              label={category?.name}
              onDelete={handleDeleteButtonClick(category.id, 'category')}
              className={classes.chip}
            />
          ))}
        </div>
      ))}
      <div className={classes.input}>
        <TextField
          variant="outlined"
          label="Add new category: "
          onChange={handleChangeCategory}
          className={classes.textfield}
        />
        <FormControl required className>
          <InputLabel>Category Type</InputLabel>
          <Select
            value={selectedCategoryType}
            onChange={handleSelect}
            disabled={!allCategoryTypes}
            label="Category Type"
            className={classes.select}
          >
            {allCategoryTypes?.map((type) => (
              <MenuItem value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          onClick={addCategory}
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
      <ConfirmationDialog
        title="Confirmation of Deletion"
        content="Are you sure to delete this entry?"
        open={open}
        setOpen={setOpen}
        handleSubmit={handleDelete}
      />
    </div>
  );
};

export default CategoriesView;
