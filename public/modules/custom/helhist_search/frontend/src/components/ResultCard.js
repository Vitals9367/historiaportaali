import React from 'react';

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

  return (
    <article className={classes}>
      <a href={url} className="content-card__link" rel="bookmark">
        <div className="content-card__image">
          <img src={imageUrl} />
        </div>
        
        <div className="content-card__content">
          <div className="content-card__metadata">
            <div className="content-card__bundle content-card__metadata-item">
              <span className="content-card__metadata-item__icon bundle-image">
              <svg aria-labelledby="camera-27315797" class="icon">
                <title id="camera-27315797">Kuva</title>
                <use xlinkHref  ="/themes/contrib/hdbt/dist/icons/sprite.svg#camera"></use>
              </svg>
              </span>
            </div>
          </div>
          <h3 className="content-card__title">{title}</h3>
        </div>
      </a>
    </article>
  );
}

export default ResultCard;
