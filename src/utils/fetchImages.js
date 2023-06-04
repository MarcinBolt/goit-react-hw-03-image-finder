import pixaby from 'services/pixaby-api';
import notification from 'services/notiflix-api';
import mapNewImages from './mapNewImages';

const fetchImages = async (images, query, actualPage) => {
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
    return notification.notifyAboutPixabyResponseError();
  }
};

export default fetchImages;
