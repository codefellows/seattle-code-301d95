import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import './App.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Content from './Content';



class App extends React.Component {

  

  render() {
    return (
      <>
        <h1>new</h1>
        {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/>}
        {this.props.auth0.isAuthenticated ? <Content/> : <h2>Please login</h2>}
      </>

    );
  }
}

export default withAuth0(App);
