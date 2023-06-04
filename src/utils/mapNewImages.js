
const mapNewImages = fetchedImages => {
  const mappedImages = fetchedImages.map(image => ({
    id: image.id,
    small: image.webformatURL,
    large: image.largeImageURL,
    alt: image.tags,
  }));
  return mappedImages;
};

export default mapNewImages;