import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchResults from './SearchResults'
import Main from './Main'
import './App.css'

class BooksApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  updateShelf = (shelf, book) => {
    shelf !== book.shelf
    && BooksAPI.update(book, shelf)
    .then(() => {
      const newBook = book
      newBook.shelf = shelf
      const newBooks = this.state.books.filter((element) => element.id !== book.id).concat([newBook])
      this.setState({books: newBooks})
    })
    .catch((err) => {
      this.setState({books: []})
    })
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
        <Route exact path='/' render={ () =>
          <Main books={this.state.books} changeShelf={this.updateShelf.bind(this)}/>
        }/>
        <Route path="/search" render={() =>
          <SearchResults books={this.state.books} changeShelf={this.updateShelf.bind(this)}/>
        }/>
      </div>
    )
  }
}

export default BooksApp
