import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import config from "./config";
import Amplify from "aws-amplify";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./login";
import { AppContext } from "./lib/context";
import { Button } from "react-bootstrap";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    Amplify.Auth.currentSession().then(() => {
      setIsUserAuthenticated(true);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ isUserAuthenticated, setIsUserAuthenticated }}
    >
      <pre>{JSON.stringify({ loggedIn: isUserAuthenticated }, null, "  ")}</pre>
      {isUserAuthenticated && (
        <Button
          onClick={() => {
            Amplify.Auth.signOut().then(() => {
              setIsUserAuthenticated(false);
            });
          }}
        >
          Logout
        </Button>
      )}
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={() => <h1>Hello World!</h1>} />
      </Switch>
    </AppContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
