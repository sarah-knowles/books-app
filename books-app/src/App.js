import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import './index.css';



class App extends Component {
  state = {
    books: [],
    newBookData: {
      title: '',
      rating: '',
      author: ''
    },
    newBookModal: false
  }
  componentWillMount() {
    axios.get('http://localhost:3000/books').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }

  toggleNewBookModal() {
    this.setState({
      newBookModal: true
    });
  }

  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            <Button color='success' size='sm' className='mr-2'>Edit</Button>
            <Button color='danger' size='sm' className='mr-2'>Delete</Button>
          </td>
        </tr>
      )
    });

    return (
      <div className="App container">

        <Button color='primary' onClick={this.toggleNewBookModal.bind(this)}>Add New Book</Button>
        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add New Book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input id='title' value={this.state.newBookData.title} onChange={(e) => {
               let { newFormData } = this.state;
               newFormData.title = e.target.value;
               
               this.setState({ newFormData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for='rating'>Rating</Label>
              <Input id='rating' value={this.state.newBookData.rating} onChange={(e) => {
              let { newFormData } = this.state;
              newFormData.rating = e.target.value;
              
              this.setState({ newFormData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for='author'>Author</Label>
              <Input id='author' value={this.state.newBookData.author} onChange={(e) => {
              let { newFormData } = this.state;
              newFormData.author = e.target.value;
              
              this.setState({ newFormData });
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggleNewBookModal.bind(this)}>Save Book</Button>(' ')
          <Button color='primary' onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* Table is a reactstrap item */}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
