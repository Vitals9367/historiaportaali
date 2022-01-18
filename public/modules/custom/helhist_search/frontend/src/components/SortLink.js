import React from 'react';
import { IconArrowDown, IconArrowUp } from 'hds-react/icons';

const SortLink = ({ title, ariaLabel, active, ascending, onPress }) => {
  return (
    <li className={active ? "active" : ""}>
      <button tabIndex="0" aria-label={ariaLabel} onClick={onPress}>
        {title}
        {active && !ascending && (
          <IconArrowDown className="icon" aria-label={window.Drupal ? window.Drupal.t("Ascending order", {}, {context: "Search"}) : "Ascending order"} />
        )}
        {active && ascending && (
          <IconArrowUp className="icon" aria-label={window.Drupal ? window.Drupal.t("Descending order", {}, {context: "Search"}) : "Descending order"} />
        )}
      </button>
    </li>
  )
}

export default SortLink;