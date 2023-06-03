import React, { Component } from "react";
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
   
    
   
    render() {
        const { id, src, alt, data, onClick } = this.props;
        return (
          <li className={css.item}>
            <img
              className={css.itemImage}
              id={id}
              src={src}
              alt={alt}
              data-source={data}
              onClick={onClick}
            ></img>
          </li>
        );
    }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};