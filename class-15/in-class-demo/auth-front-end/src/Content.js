import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

class Content extends React.Component {

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {
      // get a token
      const res = await this.props.auth0.getIdTokenClaims();
      console.log('hi');
      // console.log(res);
      // MUST use double underscore
      const jwt = res.__raw;

      // for today's lab, this is as far as you need to go. Log the token
      console.log(jwt);

      // axios docs show us how to send a config object
      // we can use it to make requests

      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }

      const bookResults = await axios(config);

      // // way you are used to seeing it:
      // let url = `${process.env.REACT_APP_SERVER}/books`;
      // const bookResults = await axios.get(url);
      console.log(bookResults.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    console.log(this.props.auth0.user);
    return (
      <>
        <h1>Content page</h1>
      </>
    )
  }
}

export default withAuth0(Content);
