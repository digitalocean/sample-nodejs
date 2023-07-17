import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import App from './App';
import { url } from './url';

const region = 'us-east-2';
const userPoolId = 'us-east-2_JTfbOx7IW';
const userPoolWebClientId = '51eq1c0j7bqjb2pmie7qa2s2t5';

const AuthDetails = {
  region,
  userPoolId,
  userPoolWebClientId,
};

Amplify.configure(AuthDetails);

const Auth = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);

      if (authData) {
        fetch(`${url}login`, {
          method: 'POST',
          body: JSON.stringify({ username: authData.username }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((r) => r.json())
          .then((loginResult) => {
            if (loginResult) setUser(authData)
            else throw new Error('did not get true from post to login instead got', loginResult)
          });
      }

    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <App wholeUser={user} />
      {/* <div>Hello, {JSON.stringify(user)}</div> */}
      <AmplifySignOut />
    </div>
  ) : (
      <AmplifyAuthenticator />
    );
}

export default Auth;
