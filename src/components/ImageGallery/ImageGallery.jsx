import { React } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css'

const ImageGallery = ({ images, onClickModal }) => {
    return(
        <>
            <ul className={css.imageGallery}>
                {Array.isArray(images) && images.map(image => {
                    return (
                        <ImageGalleryItem
                        key={image.id}
                        image={image}
                        onClickModal={onClickModal}
                        />
                    );
                })}
            </ul>
        </>
    )
}

export { ImageGallery };