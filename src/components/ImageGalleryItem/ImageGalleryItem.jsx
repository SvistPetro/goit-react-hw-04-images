import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClickModal }) => {
    const { id, tags, webformatURL, largeImageURL } = image;
  
    return (
      <li key={id} className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => {
            onClickModal(largeImageURL, tags);
          }}
        />
      </li>
    );
  };
export { ImageGalleryItem };