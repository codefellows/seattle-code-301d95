import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petData: {},
      species: '',
      showPet: false
    }
  }

  handlePet = async (e) => {
    e.preventDefault();
    let petData = await axios.get(`${process.env.REACT_APP_SERVER}/pet?species=${this.state.species}`);
    console.log(petData);
    this.setState({
      petData: petData.data,
      showPet: true
    });
  }

  handleInput = (e) => {
    this.setState({
      species: e.target.value
    })
  }

  render() {
    return (
      <>
        <h1>Find Your Pet</h1>
        <form onSubmit={this.handlePet}>
          <label>Search
            <input type="text" onInput={this.handleInput} />
          </label>
          <button>Display Pet</button>
        </form>
        {
          this.state.showPet 
          && 
          <p>{this.state.petData.name} is a {this.state.petData.breed}</p>
        }
      </>
    );
  }
}

export default App;
