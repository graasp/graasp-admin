import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {
  ADMINS_PATH,
  ADMIN_PROFILE_PATH,
  CATEGORIES_PATH,
  HOME_PATH,
  ITEMS_PATH,
  MEMBERS_PATH,
  VALIDATIONS_PATH,
  buildAdminPath,
  buildItemPath,
  buildMemberPath,
  buildValidationPath,
} from '../config/paths';
import SingleItem from './items/SingleItem';
import SingleValidation from './items/SingleValidation';
import Main from './main/Main';
import SingleAdmin from './members/SingleAdmin';
import SingleMember from './members/SingleMember';
import AdminsView from './views/AdminsView';
import CategoriesView from './views/CategoriesView';
import ItemsView from './views/ItemsView';
import MembersView from './views/MembersView';
import ProfileView from './views/ProfileView';
import ValidationsView from './views/ValidationsView';

function App() {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path={HOME_PATH} exact element={<MembersView/>} />
          <Route path={MEMBERS_PATH} exact element={<MembersView/>} />
          <Route path={ITEMS_PATH} exact element={<ItemsView/>} />
          <Route path={CATEGORIES_PATH} exact element={<CategoriesView/>} />
          <Route path={VALIDATIONS_PATH} exact element={<ValidationsView/>} />
          <Route path={ADMIN_PROFILE_PATH} exact element={<ProfileView/>} />
          <Route path={ADMINS_PATH} exact element={<AdminsView/>} />
          <Route path={buildItemPath()} element={<SingleItem/>} />
          <Route path={buildMemberPath()} element={<SingleMember/>} />
          <Route path={buildAdminPath()} element={<SingleAdmin/>} />
          <Route path={buildValidationPath()} element={<SingleValidation/>} />
        </Routes>
      </Main>
    </Router>
  );
}

export default App;
