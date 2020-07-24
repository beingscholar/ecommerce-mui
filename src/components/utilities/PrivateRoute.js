
import React from 'react'
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import { Auth } from 'aws-amplify';

class PrivateRoute extends React.Component {
    state = {
      loaded: false,
      isAuthenticated: false,
      user_id: "0"
    }
    componentDidMount() {
      this.authenticate()
      this.unlisten = this.props.history.listen(() => {
        Auth.currentAuthenticatedUser()
          .then(user => console.log('user: ', user.attributes.sub))
          .catch(() => {
            if (this.state.isAuthenticated) this.setState({ isAuthenticated: false })
          })
      });
    }
    componentWillUnmount() {
      this.unlisten()
    }
    async authenticate() {
     await Auth.currentAuthenticatedUser()
        .then((user) => {
          this.setState({ loaded: true, isAuthenticated: true, user_id:user.attributes.sub })
          console.log(this.state.user_id);
        })
        .catch(() => this.props.history.push('/signin'))
    }
    render() {
      
      const { loaded , isAuthenticated, user_id} = this.state;
      const { component: Component, ...rest } = this.props;
      if (!loaded) return null
      return (
        <Route
          {...rest}
          render={props => {
            return isAuthenticated ? (
              <Component {...props}/>
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                }}
              />
            )
          }}
        />
      )
    }
  }
  
  export default PrivateRoute = withRouter(PrivateRoute)