import React, { Suspense, lazy } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { routeNames, Loading, Pretty } from './Fields';

const App = ({ wholeUser }) => {
  const { username } = wholeUser;

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          {Object.keys(routeNames).map(string => {
            const componentName = string.split(' ').join('');
            return (
              <Route
                key={componentName}
                path={`/${componentName.toLowerCase()}`}
                render={props => {
                  const Component = lazy(() => import(`./${componentName}`));
                  return (
                    <Pretty username={username}>
                      <Component {...props} user={username} />
                    </Pretty>
                  );
                }}
              />
            );
          })}
          <Route>
            <Redirect to={'/home'} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
