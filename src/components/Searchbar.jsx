import React, { Component } from 'react';
import css from './Searchbar.module.css';
import notification from 'services/notiflix-api';

export class Searchbar extends Component {
  state = {
    images: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    const formDOM = e.currentTarget;
    const query = formDOM.elements.search.value.trim();

    if (!query) {
      notification.notifyEmptyQuery();
      return;
    }

    this.props.onSubmit({ query });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.formButton}>
            <span className={css.formButtonLabel}>Search</span>
          </button>
          <input
            className={css.formInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
