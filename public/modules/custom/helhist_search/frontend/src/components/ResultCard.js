import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({
  type,
  title,
  imageUrl,
  formats,
  phenomenon,
  startYear,
  url
}) => {
  const classes = `content-card content-card--${type} content-card--design-search-index`;
  const animations = {
    initial: { opacity: 0.2, y: "-15rem" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0.2, y: "15rem" },
    transition: {
      duration: 0.15
    }
  }

  return (
    <motion.div layout className="result-wrapper" {...animations}>
      <article className={classes}>
        <a href={url} className="content-card__link" rel="bookmark">
          <div className="content-card__image">
            <img src={imageUrl} />
          </div>
          
          <div className="content-card__content">
            <div className="content-card__metadata">
              <div className="content-card__bundle content-card__metadata-item">
                <span className="content-card__metadata-item__icon bundle-image">
                <svg aria-labelledby="camera-27315797" className="icon">
                  <title id="camera-27315797">{formats}</title>
                  <use xlinkHref  ="/themes/contrib/hdbt/dist/icons/sprite.svg#camera"></use>
                </svg>
                </span>
              </div>
              {startYear && (
                <div className="content-card__year content-card__metadata-item">
                  <span className="content-card__metadata-item__text">{startYear}</span>
                </div>
              )}
            </div>
            <h3 className="content-card__title">{title}</h3>
            <span className="content-card__arrow">
              <svg aria-labelledby="arrow-right-2076944769" className="icon">
                <title id="arrow-right-2076944769">{window.Drupal.t("Go to content")}</title>
                <use xlinkHref="/themes/contrib/hdbt/dist/icons/sprite.svg#arrow-right"></use>
              </svg>
            </span>
          </div>
        </a>
      </article>
    </motion.div>
  );
}

export default ResultCard;
