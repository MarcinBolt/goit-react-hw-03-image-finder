import Notiflix from 'notiflix';

const notifyAboutHowManyMatchesFound = totalHits =>
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

const notifyEmptyQuery = () => {
  Notiflix.Notify.info('Empty search. Please, type anything and try again.');
};

const notifyAboutNoMatching = () => {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};
const notifyAboutPixabyResponseError = () => {
  Notiflix.Notify.failure(
    'Something goes wrong with Pixaby API. Please try again or contact the service.'
  );
};

const notification = {
  notifyAboutHowManyMatchesFound,
  notifyEmptyQuery,
  notifyAboutNoMatching,
  notifyAboutPixabyResponseError,
};

export default notification;
