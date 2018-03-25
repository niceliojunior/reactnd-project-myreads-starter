import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
//import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  } 

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={() => (
            <ListBooks />
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks />
          )}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
