import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ADMIN_PROFILE,
  buildItemPath,
  buildMemberPath,
  HOME_PATH,
  ITEMS_PATH,
  MEMBERS_PATH,
} from '../config/paths';
import Main from './main/Main';
import MembersView from './views/MembersView';
import ItemsView from './views/ItemsView';
import ItemScreen from './items/ItemScreen';
import ProfileView from './views/ProfileView';
import SingleMember from './members/SingleMember';

function App() {
  return (
    <Router>
      <Main>
        <Switch>
          <Route path={HOME_PATH} exact component={MembersView} />
          <Route path={MEMBERS_PATH} exact component={MembersView} />
          <Route path={ITEMS_PATH} exact component={ItemsView} />
          <Route path={ADMIN_PROFILE} exact component={ProfileView} />
          <Route path={buildItemPath()} component={ItemScreen} />
          <Route path={buildMemberPath()} component={SingleMember} />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
