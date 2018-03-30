import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'

import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    shelves: [{"id": "currentlyReading", "name": "Currently Reading"},
              {"id": "wantToRead", "name": "Want to Read"},
              {"id": "read", "name": "Read"}]
  } 

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Update shelf book
  // Require: A book object and id of shelf
  updateShelfBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(result => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id).concat([ book ])
      }))
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={() => (
            <ListBooks 
              books={this.state.books} 
              shelves={this.state.shelves} 
              onUpdateShelfBook={this.updateShelfBook}
            />
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks
              books={this.state.books} 
              shelves={this.state.shelves}
              onUpdateShelfBook={this.updateShelfBook}
            />
          )}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
