import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Books from './Books'

class ListBooks extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books, shelves, onUpdateBook } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (
            <div className="bookshelf" key={shelf.id}>
              <h2 className="bookshelf-title">{shelf.name}</h2>
              <div className="bookshelf-books">
                <Books 
                  books={books.filter((book) => book.shelf === shelf.id)} 
                  shelves={shelves} 
                  onUpdateBook={onUpdateBook}/>
              </div>
            </div>
          ))}
        </div>

        <div className="open-search">
          <Link to="search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks