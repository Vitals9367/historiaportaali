import React from 'react';
import SortLink from './SortLink';

const SortLinks = ({ currentSort, onSortChange, sortOrderAscending }) => {
  return (
    <div className="search-header__sort-container">
      <h4>Lajittele:</h4>
      <ul className="sort-options">
        <SortLink
          title="Osuvuus"
          active={currentSort === "relevance"}
          ascending={sortOrderAscending}
          ariaLabel="Sort by relevance"
          onPress={() => onSortChange("relevance")}
        />

        <SortLink
          title="Vuosiluku"
          active={currentSort === "year"}
          ascending={sortOrderAscending}
          ariaLabel="Sort by year"
          onPress={() => onSortChange("year")}
        />

        <SortLink
          title="Julkaisuajankohta"
          active={currentSort === "created"}
          ascending={sortOrderAscending}
          ariaLabel="Sort by creation date"
          onPress={() => onSortChange("created")}
        />
      </ul>
    </div>
  )
}

export default SortLinks;