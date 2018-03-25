import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  } 

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    console.log(this.state.books)
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={() => (
            <ListBooks books={this.state.books} />
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks books={this.state.books} />
          )}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
