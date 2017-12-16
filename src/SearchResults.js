import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchResults extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    searchResults:[],
    query: ""
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
    query !== "" && this.searchBooks(query)
  }

  searchBooks = (query) => {
    BooksAPI.search(query)
    .then((results) => {
      this.setState({searchResults:results})
    })
  }

  render() {
    // this.state.searchResults !== undefined &&
      // this.state.searchResults.map((book) => {
      //   const oldBook = this.props.books.find((item) => item.id === book.id)
      //   oldBook !== undefined
      //   ?(book.shelf=oldBook.shelf)
      //   :(book.shelf="none")
      //   return true
      // })
    const hashTable = {}
    this.props.books.forEach((book) => hashTable[book.id] = book.shelf)
    this.state.searchResults !== undefined
    && this.state.searchResults.forEach((book) => book.shelf = hashTable[book.id] || 'none')
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => {
                this.updateQuery(event.target.value)
              }
            }/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.searchResults !== undefined
              && this.state.searchResults.map((book) => {
                return (
                  <li key={book.id}>
                    <Book book={book} handleUpdate={this.props.changeShelf}/>
                  </li>
                )
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchResults
