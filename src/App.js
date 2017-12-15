import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelves from './BookShelves'
import SearchResults from './SearchResults'
import './App.css'

class BooksApp extends Component {

  state = {
    books: []
  }

  updateShelf = (shelf, book) => {
    shelf !== book.shelf
    && BooksAPI.update(book, shelf)
    .then(this.getBooks())
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() =>
          <SearchResults books={this.state.books} changeShelf={this.updateShelf.bind(this)}/>
        }/>
        <Route exact path='/' render={ () =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelves books={this.state.books} changeShelf={this.updateShelf.bind(this)}/>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }/>
      </div>
    )
  }
}

export default BooksApp
