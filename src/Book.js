import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired
  }

  render() {
    const book = this.props.book
    const thumbnail = (book.imageLinks !== undefined && book.imageLinks.thumbnail !== undefined)
                      ? book.imageLinks.thumbnail
                      : "https://dummyimage.com/128x193/aaa/fff.jpg&text=Not+available"
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf}
              onChange={ (event) => {
                this.props.handleUpdate(event.target.value, book)
              }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{
          book.authors
          ? book.authors.join(",")
          : "No Author"
        }</div>
      </div>
  )}
}

export default Book
