import React from "react";
import "./App.scss";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import LoadingIndicator from "./components/layouts/LoadingIndicator";
import Main from "./components/Main";

import Amplify from "aws-amplify";

import "@aws-amplify/ui/dist/style.css";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_fPG3z00th",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "1pgoli69kjl90l7sm6q4nmstrc",
  },
});
//Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <React.Fragment>
        <LoadingIndicator />
      </React.Fragment>
      <Main />
      <React.Fragment>
        <NotificationContainer />
      </React.Fragment>
    </div>
  );
}

export default App;
