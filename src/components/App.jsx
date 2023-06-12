import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import fetchImages from '../utils/fetchImages';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    hasError: false,
    query: '',
    actualPage: 1,
    lastPage: 1,
    modalIsOpen: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  modalImageInfo = {
    imgUrl: null,
    imgAlt: null,
  };

  setStateOnFormSubmit = ({ query }) => {
    this.setState({ query: query, actualPage: 1 });
  };

  openModal = e => {
    this.setState({
      modalIsOpen: true,
    });

    this.modalImageInfo = {
      imgUrl: e.target.dataset['source'],
      imgAlt: e.target.alt,
    };
  };

  closeModalOnOutsideClick = e => {
    if (e.target.nodeName !== 'IMG') {
      this.setState({
        modalIsOpen: false,
      });
    }
  };

  closeModalOnPressEsc = e => {
    if (e.key === 'Escape') {
      this.setState({
        modalIsOpen: false,
      });
    }
  };

  incrementActualPage = () => {
    this.setState(prevState => {
      return { actualPage: prevState.actualPage + 1 };
    });
  };

  handleSetImages = response => {
    this.setState({
      images: response.images,
      actualPage: response.actualPage,
      lastPage: response.lastPage,
      isLoading: response.isLoading,
    });
  };

  handleSetError = () => {
    this.setState({ hasError: true });
  };

  handleSetIsLoading = () => {
    this.setState({ isLoading: false });
  };

  async componentDidUpdate(_prevProps, prevState) {
    const { query, actualPage, images } = this.state;

    if (prevState.query !== query || prevState.actualPage !== actualPage) {
      this.setState({ isLoading: true });
      fetchImages(
        images,
        query,
        actualPage,
        this.handleSetImages,
        this.handleSetError,
        this.handleSetIsLoading
      );
    }
  }

  render() {
    const { images, actualPage, lastPage, isLoading, modalIsOpen } = this.state;
    const { imgUrl, imgAlt } = this.modalImageInfo;

    //On App error
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong, please try again later, or contact the service
          :(
        </h1>
      );
    }

    // App run with no error
    return (
      <>
        <Searchbar onSubmit={this.setStateOnFormSubmit} />
        <ImageGallery
          images={images}
          page={actualPage}
          onClick={this.openModal}
        ></ImageGallery>
        {actualPage !== lastPage && images.length > 0 && !isLoading ? (
          <Button onClick={this.incrementActualPage} />
        ) : null}
        {isLoading && <Loader />}
        {modalIsOpen && (
          <Modal
            imgSrc={imgUrl}
            imgAlt={imgAlt}
            closeModalOnOutsideClick={this.closeModalOnOutsideClick}
            closeModalOnPressEsc={this.closeModalOnPressEsc}
          ></Modal>
        )}
      </>
    );
  }
}
