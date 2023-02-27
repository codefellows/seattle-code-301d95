import React from 'react';
import './Person.css';

class Person extends React.Component {
  render() {
    console.log(this.props.name);
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>text here</p>
      </article>
    );
  }
};

export default Person;
