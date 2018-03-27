import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Books extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books, shelves, onUpdateBook } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select defaultValue={book.shelf} onChange={(event) => onUpdateBook(book, event.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    {shelves.map((shelf) => (
                      <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                    ))}
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              { (book.authors !== undefined ?
                  book.authors.map((author) => (
                    <div key={author} className="book-authors">{author}</div>
                  ))
                : '')
              }
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default Books