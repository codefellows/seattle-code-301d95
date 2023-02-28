import React from 'react';
import Main from './Main';
import data from './data.json';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <>
        <header>
          <h1>People of 301</h1>
        </header>
        <Main data={data}/>
        <footer>&copy; Code Fellows</footer>
      </>
    );
  }
}

export default App;
