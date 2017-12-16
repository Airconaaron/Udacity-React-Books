import React, { Component } from 'react'
import BookShelves from './BookShelves'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Main extends Component {
  static propTypes = {
    changeShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  render() {
    return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <BookShelves books={this.props.books} changeShelf={this.props.changeShelf}/>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )}
}

export default Main
