import React, { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <RotatingLines
          strokeColor="#3f51b5"
          strokeWidth="5"
          animationDuration="0.4"
          width="50"
          visible={true}
        />
      </div>
    );
  }
}
