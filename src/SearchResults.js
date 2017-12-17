import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle';

class SearchResults extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      query: ""
    }
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
    .catch((err) => {
      this.setState({searchResults: []})
    })
  }

  render() {
    const hashTable = {}
    this.props.books.forEach((book) => hashTable[book.id] = book.shelf)
    this.state.searchResults !== undefined
    && this.state.searchResults.forEach((book) => book.shelf = hashTable[book.id] || 'none')
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="250" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => {
                  this.updateQuery(event.target.value)
                }

              }/>
            </Debounce>
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
