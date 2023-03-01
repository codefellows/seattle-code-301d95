import React from 'react';
import Person from './Person';
import './Main.css';

class Main extends React.Component {

  render() {
    // console.log(this.props.data);
    let people = this.props.data.map((pep, idx) => {
      // console.log(pep.name);
        return (
          <Person
            name={pep.name}
            imageURL={pep.imageURL}
            addHearts={this.props.addHearts}
            handleOpenModal={this.props.handleOpenModal}
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
