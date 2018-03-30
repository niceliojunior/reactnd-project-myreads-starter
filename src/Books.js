import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'

class Books extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateShelfBook: PropTypes.func.isRequired
  }

  render() {
    const { books, shelves, onUpdateShelfBook } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book, index) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                {(book.imageLinks !== undefined ? 
                  <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div> 
                : 
                  <div className="book-cover">Cover Not Available</div>
                )}
                <div className="book-shelf-changer">
                  <select defaultValue={book.shelf} onChange={(event) => onUpdateShelfBook(book, event.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    {shelves.map((shelf) => (
                      <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                    ))}
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {(book.authors !== undefined ?
                book.authors.map((author) => (<div key={author} className="book-authors">{author}</div>))
              :
                ''
              )}
              {(book.categories !== undefined ?
                book.categories.map((category) => (
                  <div key={category} className="book-categories">{category}</div>
                ))
                : '')}
              <div className="book-rating">
                <StarRatingComponent
                  editing={false}
                  name={`rating-${index}`}
                  value={book.averageRating}>
                </StarRatingComponent>
              </div>
              <Link to={`${book.infoLink}`} className="book-more-info" target="_blank" title="More info">[ + ] More Info</Link>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default Books