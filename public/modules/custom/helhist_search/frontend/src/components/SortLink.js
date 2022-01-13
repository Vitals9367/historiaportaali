import React from 'react';

const SortLink = ({ title, ariaLabel, active, ascending, onPress }) => {
  return (
    <li className={active ? "active" : ""}>
      <button tabIndex="0" aria-label={ariaLabel} onClick={onPress}>
        {title}
        {active && !ascending && (
          <svg aria-labelledby="arrow-down-366054103" className="icon">
            <title id="arrow-down-366054103">Ascending icon</title>    <use xlinkHref="/themes/contrib/hdbt/dist/icons/sprite.svg#arrow-down"></use>
          </svg>
        )}
        {active && ascending && (
          <svg aria-labelledby="arrow-up-744178784" className="icon">
            <title id="arrow-up-744178784">Descending icon</title>    <use xlinkHref="/themes/contrib/hdbt/dist/icons/sprite.svg#arrow-up"></use>
          </svg>
        )}
      </button>
    </li>
  )
}

export default SortLink;