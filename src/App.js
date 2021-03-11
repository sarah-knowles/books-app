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
    editBookData: {
      id: '',
      title: '',
      rating: '',
      author: ''
    },
    newBookModal: false,
    editBookModal: false
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
      newBookModal: !this.state.newBookModal
    });
  }

  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal
    })
  }


  addBook() {
    axios.post('http://localhost:3000/books', this.state.newBookData).then((response) => {
      let { books } = this.state;
      books.push(response.data);
      this.setState({
        books, newBookModal: false, newBookData: {
          title: '',
          rating: '',
          author: ''
        }
      });
    });
  }

  updateBook() {
    let { title, rating, author } = this.state.editBookData;
    axios.put('http://localhost:3000/books/' + this.state.editBooksData.id, {
      title, rating, author
    }).then((response) => {
      this._refreshBooks();
      this.setState({
        editBookModal: false, editBookData: { id: '', title: '', rating: '', author: '' }
      })
    });
  }


  editBook(id, title, rating, author) {
    this.setState({
      editBookData: { id, title, rating, author }, editBookModal: !this.state.editBookModal
    });
  }

  deleteBook(id) {
    axios.get('http://localhost:3000/books' + id).then((response) => {
      this._refreshBooks();
    });
  }

  _refreshBooks() {
    axios.get('http://localhost:3000/books').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }

  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            <Button color='success' size='sm' className='mr-2' onClick={this.editBook.bind(this, book.id, book.title, book.rating, book.author)}>Edit</Button>
            <Button color='danger' size='sm' className='mr-2'>Delete</Button>
          </td>
        </tr>
      )
    });

    return (
      <div className="App container">

        <h1>React Books App</h1>

        <Button className='my-3' color='primary' onClick={this.toggleNewBookModal.bind(this)}>Add New Book</Button>
        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add New Book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input id='title' value={this.state.newBookData.title} onChange={(e) => {

                let { newBookData } = this.state;
                newBookData.title = e.target.value;
                this.setState({ newBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for='rating'>Rating</Label>
              <Input id='rating' value={this.state.newBookData.rating} onChange={(e) => {
                let { newBookData } = this.state;
                newBookData.rating = e.target.value;
                this.setState({ newBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for='author'>Author</Label>
              <Input id='author' value={this.state.newBookData.author} onChange={(e) => {
                let { newBookData } = this.state;
                newBookData.author = e.target.value;
                this.setState({ newBookData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.addBook.bind(this)}>Save Book</Button>(' ')
          <Button color='primary' onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit Book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input id='title' value={this.state.editBookData.title} onChange={(e) => {

                let { editBookData } = this.state;
                editBookData.title = e.target.value;
                this.setState({ editBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for='rating'>Rating</Label>
              <Input id='rating' value={this.state.editBookData.rating} onChange={(e) => {
                let { editBookData } = this.state;
                editBookData.rating = e.target.value;
                this.setState({ editBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for='author'>Author</Label>
              <Input id='author' value={this.state.editBookData.author} onChange={(e) => {
                let { editBookData } = this.state;
                editBookData.author = e.target.value;
                this.setState({ editBookData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.updateBook.bind(this)}>Update Book</Button>(' ')
          <Button color='primary' onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
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
