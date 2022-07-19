import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItem from '@material-ui/core/ListItem';
import PollIcon from '@material-ui/icons/Poll';
import FolderIcon from '@material-ui/icons/Folder';
import PeopleIcon from '@material-ui/icons/People';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import List from '@material-ui/core/List';
import { Adjust, Home } from '@material-ui/icons';
import {
  ADMINS_PATH,
  PROJECTS_PATH,
  COLLECTIONS_PATH,
  ORGANIZATIONS_PATH,
  HOME_PATH,
  ITEMS_PATH,
  MEMBERS_PATH,
  HEALTHCHECKS_PATH,
  STATUS_PATH,
  ENVIRONMENTS_PATH,
  TESTS_PATH,
} from '../../config/paths';
import ExpandableListItem from '../common/ExpandableListItem';

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
          <Home />
        </ListItemIcon>

        <ListItemText primary={t('Home')} />
      </ListItem>
      <ExpandableListItem
        itemName="Users"
        icon={<PeopleIcon />}
        content={['Members', 'Admins', 'Organizations', 'Projects']}
        paths={[MEMBERS_PATH, ADMINS_PATH, ORGANIZATIONS_PATH, PROJECTS_PATH]}
      />
      <ExpandableListItem
        itemName="Items"
        icon={<FolderIcon />}
        content={['Collections', 'Items']}
        paths={[COLLECTIONS_PATH, ITEMS_PATH]}
      />

      <ExpandableListItem
        itemName="Ecosystem"
        icon={<Adjust />}
        content={['Environments', 'Status', 'Healthchecks', 'Tests']}
        paths={[ENVIRONMENTS_PATH, STATUS_PATH, HEALTHCHECKS_PATH, TESTS_PATH]}
      />

      <ListItem button disabled>
        <ListItemIcon>
          <PollIcon />
        </ListItemIcon>
        <ListItemText primary={t('Analytics')} />
      </ListItem>

      <ListItem button disabled>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t('Settings')} />
      </ListItem>
    </List>
  );
};

export default MainMenu;
