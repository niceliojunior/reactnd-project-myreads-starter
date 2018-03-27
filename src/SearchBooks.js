import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import Books from './Books'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  searchBooks = (books, query) => {
    this.setState({ query: query })

    if (query) {
      console.log(query)
      BooksAPI.search(query).then((searchBooks) => {
        if (searchBooks.error === undefined) {
          //this.setState(state => ({
           // books: searchBooks.filter((searchBook) => searchBook.id !== book.id).concat([ book ])
          //  books: searchBooks.map((searchBook) => 
          //    console.log(books.filter((book) => book.id === searchBook.id).shelf)
          //  ) 
          //}))
          //this.setState({ books: books })
          console.log(books)
          let x = searchBooks.map((searchBook) => {
            searchBook.shelf = 'read'
           let y = books.filter((book) => book.id === searchBook.id)
           console.log(y)
            
          })
          console.log(x)
        }
      })
    } else {
      this.setState({ books: [] })
    }
  }

  render() {
    const { shelves, books, onUpdateBook } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={3}
              debounceTimeout={300} 
              placeholder="Search by title or author, least 3 letters" 
              value={this.state.query}
              onChange={(event) => this.searchBooks(books, event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <Books 
            books={this.state.books}
            shelves={shelves}
            onUpdateBook= {onUpdateBook} />
        </div>
      </div>
    )
  }
}

export default SearchBooks