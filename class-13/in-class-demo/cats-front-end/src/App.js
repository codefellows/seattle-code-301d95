import React from 'react';
import axios from 'axios';
import Cats from './Cats';
import { Button, Container, Form } from 'react-bootstrap';
import './App.css';

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cats: []
    }
  }

  getCats = async () => {
    try {
      let results = await axios.get(`${SERVER}/cats`);
      this.setState({
        cats: results.data
      })
    } catch(error){
      console.log('we have an error: ', error.response.data)
    }
  }

  postCat = async ( newCat ) => {
    try {
      let url = `${SERVER}/cats`;
      let createdCat = await axios.post(url, newCat);
      console.log(createdCat.data);
      // this.getCats();
      this.setState({
        cats: [...this.state.cats, createdCat.data]
      })
    } catch(error){
      console.log('we have an error: ', error.response.data)
    }
  }

  deleteCat = async (id) => {
    try {
      let url = `${SERVER}/cats/${id}`;
      // DO NOT expect a returned value from axios.delete();
      await axios.delete(url);
      let updatedCats = this.state.cats.filter(cat => cat._id !== id);
      this.setState({
        cats: updatedCats
      });
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
  }

  updateCat = async (catToUpdate) => {
    console.log(catToUpdate);
    try {
      let url = `${SERVER}/cats/${catToUpdate._id}`;
      let updatedCatFromDB = await axios.put(url, catToUpdate);
      let updatedCats = this.state.cats.map((cat) => {
        return cat._id === catToUpdate._id
          ? updatedCatFromDB.data
          : cat;
      });
      this.setState({
        cats: updatedCats
      })
      console.log(updatedCats);
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
  }

  handleCatSubmit = (e) => {
    e.preventDefault();
    let newCat = {
      name: e.target.name.value,
      location: e.target.location.value,
      color: e.target.color.value,
      spayNeuter: e.target.spayNeuter.checked
    }
    this.postCat(newCat);
  }

  // net effectt, when the site loads (had all it needs), the data will be displayed
  componentDidMount() {
    this.getCats();
  }

  render() {

    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
        {
          this.state.cats.length > 0 &&
          <>
            <Cats 
              cats={this.state.cats} 
              deleteCat={this.deleteCat} 
              updateCat={this.updateCat}
            />
          </>
        }
        <Container className="mt-5">
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
