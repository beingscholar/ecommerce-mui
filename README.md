# Customer Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Functional Requirements
* Create React App
```$ npx create-react-app components-app```
* Material-UI
```$ yarn add @material-ui/core```
* React Notifications
```$ npm install --save react-notifications```
* Promise Tracker
```$ npm install react-promise-tracker --save```
* Form Validation
```$ npm install react-material-ui-form-validator```
* Amplify
```$ yarn add aws-amplify aws-amplify-react```

## Structure and Environment
```
$ ~/components-app
├── node_modules
├── public
├── src
   ├── components
    ├── __tests__
    ├── layouts
      ├── Footer.js
      ├── LoadingIndicator.js
    ├── auth
      ├── CheckEmail.js
      ├── MySignIn.js
      ├── MySignUp.js
    ├── customers
      ├── Customers.js
      ├── CustomerEditForm.js
      ├── CustomerForm.js
      ├──CustomerProfile.js
      ├── CustomerDeleteConfirm.js 
    ├── products
      ├── Products.js
      ├── ProductEditForm.js
      ├── ProductForm.js
      ├── ProductDeleteConfirm.js 
    ├── utilities
      ├── user.js  
    ├── Dashboard.js
    ├── Admin.js
    ├── Landing.js
  ├── App.css
  ├── App.js
  ├── aws-exports.js
  ├── index.css
  ├── index.js
  ├── logo.svg
├── package-lock.json
├── package.json
├── yarn.lock
├── README.md
   
   
```

## Cognito User Pool
* This repository is integrated with a CI/CD Pipeline. Make sure to change the amplify settings to the correct region, userPoolId, and userWebClientId in App.js.

## Auth with Amplify
All functions used for Auth are placed in  `./src/components/utilities/user.js`. Most functions are then called to their associating component in `./src/components/auth` (for example, login() in MySignIn.js, signup() in MySignUp.js). THe only exception being logout(), which is called from the AppBar in `./src/components/Landing.js`.
* Sign In <br/>
For the user to sign in, a form is rendered through MySignIn.js which accepts the username and password. The values are passed to user.js, where Auth.signin() of Amplify is called.

* Sign Up <br/>
For the user to create an account, they must enter a username, password, first name, and last name. Once the user hits submit and the form values are correct, user.js runs Auth.signup() from Amplify and the user is redirected to a card telling them to check their email for confirmation and login once confirmed (CheckEmail.js). The newly created customer account will also have its details passed to the Customer API: http://adc051ee39c004d9f8d0dffa37cb7a49-a444232df49fc93a.elb.ap-southeast-1.amazonaws.com/

* Sign Out <br/>
Once the user is signed in and authenticated, they are greeted with the Admin portion of the site (Admin.js). The option to sign out will be located at the AppBar. Once clicked, user.js will remove the user token from local storage with Auth.signout(). The user will then be redirected back to the landing page. <br/> <br/>

Resource: https://docs.amplify.aws/lib/auth/getting-started?platform=js#enable-sign-insign-up-and-sign-out


## Run and Test Locally (docker-compose)

#### Step 1: Build and run application locally with docker compose
To test the application locally, you must first build the program. To do this, first make sure your docker daemon is running. Once running, you can build the application by issuing the ff command: 
```
$ docker-compose build
```
Once it is done building, you may now run the app using the ff command:
```
$ docker-compose up
```
```

```

This will create 1 containers: 
- customer-frontend

#### Step 2: Check container status
Now that you have the container running, you can check their status. I a new terminal window, and run the ff command: 
```
$ docker ps
```
```
CONTAINER ID        IMAGE                                            COMMAND                  CREATED             STATUS              PORTS                    NAMES
6b86da8ff2e1        myproject-customer-web-react_customer-frontend   "docker-entrypoint.s…"   7 minutes ago       Up 5 seconds        0.0.0.0:3000->3000/tcp   myproject-customer-web-react_customer-frontend_1
```
You should be seeing 1 running container:
- web-react_customer-frontend_1

#### Step 3: Tear down
Once you are done with development, make sure to remove and stop the provisioned containers. You can do this by running the ff command:
```
$ docker-compose down
```
```
Stopping myproject-customer-web-react_customer-frontend_1 ... done
Removing myproject-customer-web-react_customer-frontend_1 ... done
Removing network myproject-customer-web-react_default
```

## Testing
Create a file go to 
```
$ /src/components/__tests__  
touch filename.test.js

```

* Uses React-testing-library [https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/]

```yarn test``` will run all .test.js scripts in the repo. <br/>

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.sor

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
Looks at all .test.js files in the project (ex. App.test.js)



### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
