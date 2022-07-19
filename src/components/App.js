import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ADMINS_PATH,
  buildAdminPath,
  buildCollectionPath,
  buildItemPath,
  buildMemberPath,
  COLLECTIONS_PATH,
  ENVIRONMENTS_PATH,
  HOME_PATH,
  ITEMS_PATH,
  MEMBERS_PATH,
  ORGANIZATIONS_PATH,
  STATUS_PATH,
  buildEnvironmentPath,
  PROJECTS_PATH,
} from '../config/paths';
import Main from './main/Main';
import HomeView from './views/HomeView';
import MembersView from './views/MembersView';
import ItemsView from './views/ItemsView';
import SingleItem from './items/SingleItem';
import AdminsView from './views/AdminsView';
import SingleAdmin from './members/SingleAdmin';
import CollectionsView from './views/CollectionsView';
import OrganizationsView from './views/OrganizationsView';
import SingleCollection from './collections/SingleCollection';
import StatusView from './views/StatusView';
import EnvironmentsView from './views/EnvironmentsView';
import SingleEnvironment from './environments/SingleEnvironment';
import ProjectsView from './views/ProjectsView';
import NewProfileView from './views/NewProfileView';

function App() {
  return (
    <Router>
      <Main>
        <Switch>
          <Route path={HOME_PATH} exact component={HomeView} />
          <Route path={MEMBERS_PATH} exact component={MembersView} />
          <Route path={buildMemberPath()} component={NewProfileView} />
          <Route path={ADMINS_PATH} exact component={AdminsView} />
          <Route path={buildAdminPath()} component={SingleAdmin} />
          <Route
            path={ORGANIZATIONS_PATH}
            exact
            component={OrganizationsView}
          />
          <Route path={PROJECTS_PATH} exact component={ProjectsView} />
          <Route path={COLLECTIONS_PATH} exact component={CollectionsView} />
          <Route path={buildCollectionPath()} component={SingleCollection} />
          <Route path={ITEMS_PATH} exact component={ItemsView} />
          <Route path={buildItemPath()} component={SingleItem} />
          <Route path={ENVIRONMENTS_PATH} exact component={EnvironmentsView} />
          <Route path={buildEnvironmentPath()} component={SingleEnvironment} />
          <Route path={STATUS_PATH} exact component={StatusView} />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
