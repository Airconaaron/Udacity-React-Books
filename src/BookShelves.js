import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BookShelves extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    return(
      <div className="list-books-content">
        <BookShelf shelf="currentlyReading" books={this.props.books} changeShelf={this.props.changeShelf}/>
        <BookShelf shelf="wantToRead" books={this.props.books} changeShelf={this.props.changeShelf}/>
        <BookShelf shelf="read" books={this.props.books} changeShelf={this.props.changeShelf}/>
      </div>
  )}
}

export default BookShelves
