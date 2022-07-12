import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ADMIN_PROFILE_PATH,
  ADMINS_PATH,
  buildAdminPath,
  buildItemPath,
  buildMemberPath,
  HOME_PATH,
  ITEMS_PATH,
  MEMBERS_PATH,
  CATEGORIES_PATH,
} from '../config/paths';
import Main from './main/Main';
import MembersView from './views/MembersView';
import ItemsView from './views/ItemsView';
import SingleItem from './items/SingleItem';
import ProfileView from './views/ProfileView';
import SingleMember from './members/SingleMember';
import AdminsView from './views/AdminsView';
import SingleAdmin from './members/SingleAdmin';
import CategoriesView from './views/CategoriesView';

function App() {
  return (
    <Router>
      <Main>
        <Switch>
          <Route path={HOME_PATH} exact component={MembersView} />
          <Route path={MEMBERS_PATH} exact component={MembersView} />
          <Route path={ITEMS_PATH} exact component={ItemsView} />
          <Route path={CATEGORIES_PATH} exact component={CategoriesView} />
          <Route path={ADMIN_PROFILE_PATH} exact component={ProfileView} />
          <Route path={ADMINS_PATH} exact component={AdminsView} />
          <Route path={buildItemPath()} component={SingleItem} />
          <Route path={buildMemberPath()} component={SingleMember} />
          <Route path={buildAdminPath()} component={SingleAdmin} />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
