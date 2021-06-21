import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HOME_PATH } from '../config/paths';
import Main from './main/Main';
import Home from './main/Home';

function App() {
  return (
    <Router>
      <Main>
        <Switch>
          <Route path={HOME_PATH} exact component={Home} />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
