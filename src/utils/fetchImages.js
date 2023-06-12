import pixaby from 'services/pixaby-api';
import mapNewImages from './mapNewImages';
import notification from 'utils/notification';
import PropTypes from 'prop-types';

const fetchImages = async (
  images,
  query,
  actualPage,
  handleSetImages,
  handleSetError,
  handleSetIsLoading
) => {
  try {
    const fetchedData = await pixaby.getImagesBySearchingPhrases(
      query,
      actualPage
    );
    const newtListOfImagesFromPixabyNextPage = await mapNewImages(
      fetchedData.images
    );
    const combinedArrayOfFetchedImages = [
      ...images,
      ...newtListOfImagesFromPixabyNextPage,
    ];
    const lastPage = Math.ceil(fetchedData.totalHits / 12);
    const response = {
      images:
        actualPage === 1
          ? newtListOfImagesFromPixabyNextPage
          : combinedArrayOfFetchedImages,
      actualPage: actualPage,
      lastPage: lastPage,
      isLoading: false,
    };

    handleSetImages(response);

    if (actualPage === 1 && fetchedData.totalHits > 0) {
      notification.notifyAboutHowManyMatchesFound(fetchedData.totalHits);
    }
    if (fetchedData.totalHits === 0) {
      notification.notifyAboutNoMatching();
    }

    if (actualPage < 2) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return response;
  } catch (error) {
    notification.notifyAboutPixabyResponseError();
    return handleSetError();
  } finally {
    handleSetIsLoading();
  }
};

export default fetchImages;

fetchImages.propTypes = {
  images: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  actualPage: PropTypes.number.isRequired,
};
