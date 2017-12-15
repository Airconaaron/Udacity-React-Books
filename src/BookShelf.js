import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
  }

  render() {
    return(
      <div className="bookshelf">
        {/* https://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form fro camel case to regular words */}
        <h2 className="bookshelf-title">{
          this.props.shelf
          .split(/(?=[A-Z])/)
          .join(' ')
          .replace(/^./, function(str){ return str.toUpperCase(); })
        }
      </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter((book) =>
              book.shelf === this.props.shelf)
              .map((book) => {
                return (
                  <li key={book.id}>
                    <Book book={book} handleUpdate={this.props.changeShelf}/>
                  </li>
                )}
              )
            }
          </ol>
        </div>
      </div>
  )}
}

export default BookShelf
