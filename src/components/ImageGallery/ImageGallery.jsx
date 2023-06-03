import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  componentDidUpdate(prevProps) {
    const { page, images } = this.props;
    if (page !== 1 && images.length !== prevProps.images.length) {
      window.scrollBy({ top: 520, behavior: 'smooth' });
    }
  }
  render() {
    const { images, onClick } = this.props;
    return (
      <ul className={css.imageGallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              src={image.small}
              data={image.large}
              alt={image.alt}
              onClick={onClick}
            ></ImageGalleryItem>
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      small: PropTypes.string.isRequired,
      large: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
