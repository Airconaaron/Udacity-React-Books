import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BookShelves extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const shelves = [
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: this.props.books.filter(book => book.shelf === 'currentlyReading')
      },
      {
        id: 'wantToRead',
        title: 'Want To Read',
        books: this.props.books.filter(book => book.shelf === 'wantToRead')
      },
      {
        id: 'read',
        title: 'Read',
        books:this.props.books.filter(book => book.shelf === 'read')
      },
    ]
    return(
      <div className="list-books-content">
        {
          shelves.map(shelf => {
            return <BookShelf key={shelf.id} shelf={shelf.id} books={shelf.books} title={shelf.title} changeShelf={this.props.changeShelf}/>
          })
        }
      </div>
  )}
}

export default BookShelves
