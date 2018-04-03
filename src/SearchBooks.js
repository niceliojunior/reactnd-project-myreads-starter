import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import Books from './Books'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateShelfBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    filteredBooks: []
  }

  /**
  * @description Search books using the API and compare the result 
  *              with books from the state for update shelf
  * @param { object } books - The books object from props
  * @param { string } query - The search string
  * @returns { object } Each book with shelf update and the local state filteredBooks updated
  */
  searchBooks = (books, query) => {
    this.setState({ query: query })

    if (query) {
      BooksAPI.search(query).then((searchBooks) => {
        if (searchBooks.error === undefined) {
          this.setState(state => ({
            filteredBooks: searchBooks.map((searchBook) => {
                              let bookWithShelf = books.filter((book) => book.id === searchBook.id)
                              searchBook.shelf = bookWithShelf.length > 0 ? bookWithShelf[0].shelf : 'none'
                              return searchBook
                            }).sort(sortBy('title'))
          }))
        }
      })
    } else {
      this.setState({ filteredBooks: [] })
    }
  }

  render() {
    const { shelves, books, onUpdateShelfBook } = this.props

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
            books={this.state.filteredBooks}
            shelves={shelves}
            onUpdateShelfBook={onUpdateShelfBook} />
        </div>
      </div>
    )
  }
}

export default SearchBooks