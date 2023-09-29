import React, { useState } from 'react';

import SaveIcon from '@mui/icons-material//Save';
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { Loader } from '@graasp/ui';

import {
  CATEGORY_BUTTON_HEIGHT,
  CATEGORY_CHIP_HEIGHT,
  CATEGORY_SELECT_WIDTH,
} from '../../config/constants';
import { hooks } from '../../config/queryClient';
import ConfirmationDialog from '../common/ConfirmationDialog';

const {  useCategories } = hooks;

const CategoriesView = () => {
  const { data: allCateogories, isLoading } = useCategories();

  const categoriesByTypes = allCateogories?.groupBy(
    (category) => category?.type,
  );

  const [newCategoryType, setNewCategoryType] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
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
    <div>
      <Typography variant="h5">Categories</Typography>
      {/* {allCategoryTypes?.map((type) => (
        <div>
          <Typography variant="h6">{type?.name}</Typography>
          {categoriesByTypes?.get(type?.id)?.map((category) => (
            <Chip
              label={category?.name}
              onDelete={handleDeleteButtonClick(category.id, 'category')}
            />
          ))}
        </div>
      ))} */}
      <div>
        <TextField
          variant="outlined"
          label="Add new category: "
          onChange={handleChangeCategory}
        />
        {/* <FormControl required className>
          <InputLabel>Category Type</InputLabel>
          <Select
            value={selectedCategoryType}
            onChange={handleSelect}
            disabled={!allCategoryTypes}
            label="Category Type"
          >
            {allCategoryTypes?.map((type) => (
              <MenuItem value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl> */}
        <Button
          variant="contained"
          onClick={addCategory}
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
      {categoriesByTypes.map((c) => <div>{c.name}</div>)}
    </div>
  );
};

export default CategoriesView;
