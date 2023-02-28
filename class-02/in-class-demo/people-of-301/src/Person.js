import React from 'react';
import Button from 'react-bootstrap/Button';
import './Person.css';


class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waves: 0,
      helpMe: false
    };
  }

  handleWaves = () => {
    // when the user clicks on "Say Hello" update the value of this.state.waves
    // Must use setState to update a value in state
    this.setState({
      waves: this.state.waves + 1,
    });
  }

  needsHelp = () => {
    this.setState({
      helpMe: true
    });
  }

  gotHelp = () => {
    this.setState({
      helpMe: false
    });
  }

  render() {
    // STEP 1: I want to render all names and images
    // console.log(this.props.name);
    return (
      <article className="person">
        <h3>{this.props.name}</h3>
        <p>👋 {this.state.waves} greetings</p>
        <p onClick={this.handleWaves}>Say Hello!</p>
        <img
          src={this.props.imageURL}
          alt={this.props.name}
        />
        <div>{this.state.helpMe ? 'I need help!' : ''}</div>
        <Button onClick={this.needsHelp}>I need help</Button>
        <Button onClick={this.gotHelp} variant="success">I got help</Button>
      </article>
    );
  }


};

export default Person;
