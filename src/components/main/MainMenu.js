import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material//Settings';
import ListItem from '@mui/material/ListItem';
import PollIcon from '@mui/icons-material//Poll';
import FolderIcon from '@mui/icons-material//Folder';
import PeopleIcon from '@mui/icons-material//People';
import PersonIcon from '@mui/icons-material//Person';
import SupervisedUserCircleIcon from '@mui/icons-material//SupervisedUserCircle';
import CategoryIcon from '@mui/icons-material//Category';
import LibraryAddCheckIcon from '@mui/icons-material//LibraryAddCheck';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import List from '@mui/material/List';
import {
  ADMIN_PROFILE_PATH,
  ADMINS_PATH,
  HOME_PATH,
  ITEMS_PATH,
  CATEGORIES_PATH,
  VALIDATIONS_PATH,
} from '../../config/paths';

const MainMenu = () => {
  const { t } = useTranslation();
  const [dense] = useState(true);
  const { push } = useHistory();
  const { pathname } = useLocation();

  const goTo = (path) => {
    push(path);
  };

  return (
    <List dense={dense}>
      <ListItem
        button
        onClick={() => goTo(HOME_PATH)}
        selected={pathname === HOME_PATH}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>

        <ListItemText primary={t('Members')} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(ADMINS_PATH)}
        selected={pathname === ADMINS_PATH}
      >
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>

        <ListItemText primary={t('Admins')} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(ITEMS_PATH)}
        selected={pathname === ITEMS_PATH}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={t('Items')} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(CATEGORIES_PATH)}
        selected={pathname === CATEGORIES_PATH}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary={t('Categories')} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(VALIDATIONS_PATH)}
        selected={pathname === VALIDATIONS_PATH}
      >
        <ListItemIcon>
          <LibraryAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary={t('Validations')} />
      </ListItem>
      <ListItem
        button
        onClick={() => goTo(ADMIN_PROFILE_PATH)}
        selected={pathname === ADMIN_PROFILE_PATH}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={t('Profile')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PollIcon />
        </ListItemIcon>
        <ListItemText primary={t('Analytics')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t('Settings')} />
      </ListItem>
    </List>
  );
};

export default MainMenu;
