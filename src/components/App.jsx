import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import pixaby from 'services/pixaby-api';
import notification from 'services/notiflix-api';

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

  updateQuery = ({ query }) => {
    this.setState({ query: query });
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
    let { actualPage } = this.state;
    actualPage++;
    this.setState({ actualPage: actualPage });
  };

  mapNewImages = fetchedImages => {
    const mappedImages = fetchedImages.map(image => ({
      id: image.id,
      small: image.webformatURL,
      large: image.largeImageURL,
      alt: image.tags,
    }));
    return mappedImages;
  };

  async componentDidUpdate(_prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      const { query } = this.state;
      this.setState({ isLoading: true });
      try {
        const fetchedData = await pixaby.getImagesBySearchingPhrases(query, 1);
        const mappedImages = this.mapNewImages(fetchedData.images);
        const lastPage = Math.ceil(fetchedData.totalHits / 12);
        this.setState({
          images: mappedImages,
          actualPage: 1,
          lastPage: lastPage,
        });

        fetchedData.totalHits > 0
          ? notification.notifyAboutHowManyMatchesFound(fetchedData.totalHits)
          : notification.notifyAboutNoMatching();

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        this.setState({ hasError: true });
        notification.notifyAboutPixabyResponseError();
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (
      prevState.actualPage !== this.state.actualPage &&
      prevState.query === this.state.query &&
      this.state.actualPage !== 1
    ) {
      const { query, actualPage, images } = this.state;
      this.setState({ isLoading: true });
      try {
        const fetchedData = await pixaby.getImagesBySearchingPhrases(
          query,
          actualPage
        );
        const mappedImages = await this.mapNewImages(fetchedData.images);
        const concatImages = images.concat(mappedImages);
        this.setState({ images: concatImages });
      } catch (error) {
        this.setState({ hasError: true });
        notification.notifyAboutPixabyResponseError();
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, actualPage, lastPage, isLoading, modalIsOpen } = this.state;
    const { imgUrl, imgAlt } = this.modalImageInfo;

    //On App error
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong, please try again later, or contact our service
          :(
        </h1>
      );
    }

    return (
      <>
        <Searchbar onSubmit={this.updateQuery} />
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
