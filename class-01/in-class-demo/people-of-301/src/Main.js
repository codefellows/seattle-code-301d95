import React from 'react';
import Person from './Person';

class Main extends React.Component {

  render() {
    return (
      <main>
        <Person 
          name="Sheyna" 
          hairColor="Brown" 
          homeTown="Seattle"
        />
        <Person name="Ryan"/>
        <Person name="Michael"/>
        <Person name="Cody"/>
        <Person name="Laurel"/>
      </main>
    )
  };
}

export default Main;
