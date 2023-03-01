import React from 'react';
import Header from './Header';
import Main from './Main';
import data from './data.json';
import Modal from 'react-bootstrap/Modal'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hearts: '',
      isModalDisplaying: false,
      personName: ''
    }
  }

  addHearts = () => {
    this.setState({
      hearts: this.state.hearts + '❤️'
    });
  }

  handleCloseModal = () => {
    this.setState({
      isModalDisplaying: false
    });
  }

  handleOpenModal = (name) => {
    this.setState({
      isModalDisplaying: true,
      personName: name
    });
  }

  render() {
    return (
      <>
        <Header hearts={this.state.hearts}/>
        <p onClick={this.handleOpenModal}>testing</p>
        <Main 
          data={data} 
          addHearts={this.addHearts}
          handleOpenModal={this.handleOpenModal}
        />
        <footer>&copy; Code Fellows</footer>
        <Modal 
          show={this.state.isModalDisplaying} 
          onHide={this.handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.personName}</Modal.Title>
          </Modal.Header>
          <p>more can go in a modal</p>
        </Modal>
      </>
    );
  }
}

export default App;
