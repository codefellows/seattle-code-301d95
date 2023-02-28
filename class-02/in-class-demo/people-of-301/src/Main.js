import React from 'react';
import Person from './Person';
import './Main.css';

class Main extends React.Component {

  render() {
    // console.log(this.props.data);
    let people = [];
    this.props.data.forEach((pep, idx) => {
      // console.log(pep.name);
      people.push(
        <Person
          name={pep.name}
          imageURL={pep.imageURL}
          key={idx}
        />
      )
    })

    return (
      <main>
        {people}
      </main>
    )
  };
}

export default Main;
