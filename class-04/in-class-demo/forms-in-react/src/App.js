import React from 'react';
import './App.css';
import { ListGroup, Form, Button } from 'react-bootstrap';

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class App extends React.Component {
  // if we are going to use state we need a constructor
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      howToSort: '',
      filteredData: data,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // let name = e.target.name.value;
    // let selected = e.target.selected.value;
    // // console.log(name, selected);
    // this.setState({
    //   name: name,
    //   howToSort: selected
    // });
    //console.log('the value of name is: ', this.state.name);

    // let username = e.target.userName.value;
    // console.log('username: ', username);

    if (this.state.howToSort === 'even') {
      // display only the even numbers
      let newData = data.filter(num => num % 2 === 0);
      this.setState({ filteredData: newData });
    } else if (this.state.howToSort === 'odd') {
      // display only the odd numbers
      let newData = data.filter(num => num % 2 !== 0);
      this.setState({ filteredData: newData });
    } else {
      // display all the number
      this.setState({ filteredData: data });
    }
  }

  handleNameOnChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleHowToSortOnChange = (e) => {
    this.setState({
      howToSort: e.target.value
    });
  }

  render() {
    // console.log('In the render: ', this.state.name);
    let numbers = this.state.filteredData.map((num, idx) => <ListGroup.Item key={idx}>{num}</ListGroup.Item>)

    return (
      <>
        <header>
          <h1>Forms in React</h1>
        </header>
        <main>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label onChange={this.handleNameOnChange}>First Name
              <Form.Control type="text" name="name" />
            </Form.Label>

            <Form.Label htmlFor="yourLastName">Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="yourLastName" />

            <Form.Group controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>

            <Form.Label>Select Numbers
              <Form.Select name="selected" onChange={this.handleHowToSortOnChange}>
                <option value="all">All</option>
                <option value="odd">Odd</option>
                <option value="even">Even</option>
              </Form.Select>
            </Form.Label>
            <Button type="submit">Submit</Button>
          </Form>
          <ListGroup>
            {numbers}
          </ListGroup>
        </main>
        <footer>
          &copy; Code Fellows
        </footer>
      </>
    );
  }
}

export default App;



/*

<form onSubmit={this.handleSubmit}>
  <label onChange={this.handleNameOnChange}>Name
    <input type="text" name="name"/>
  </label>
  <label>Select Numbers
    <select name="selected" onChange={this.handleHowToSortOnChange}>
      <option value="all">All</option>
      <option value="odd">Odd</option>
      <option value="even">Even</option>
    </select>
  </label>
  <button type="submit">Submit</button>
</form>


*/
