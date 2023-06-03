import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.closeModalOnPressEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.closeModalOnPressEsc);
  }

  render() {
    const { imgSrc, imgAlt, closeModalOnOutsideClick } = this.props;
    return (
      <div className={css.overlay} onClick={closeModalOnOutsideClick}>
        <div className={css.modal}>
          <img src={imgSrc} alt={imgAlt} className={css.image} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  closeModalOnPressEsc: PropTypes.func.isRequired,
  closeModalOnOutsideClick: PropTypes.func.isRequired,
};
