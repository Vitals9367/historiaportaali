import React from 'react';
import SortLink from './SortLink';

const SortLinks = ({ currentSort, onSortChange, sortOrderAscending }) => {
  return (
    <div className="search-header__sort-container">
      <h4>{window.Drupal.t("Sort:", {}, {context: "Search"})}</h4>
      <ul className="sort-options">
        <SortLink
          title={window.Drupal.t("Relevance", {}, {context: "Search"})}
          active={currentSort === "relevance"}
          ascending={sortOrderAscending}
          ariaLabel={window.Drupal.t("Sort by relevance", {}, {context: "Search"})}
          onPress={() => onSortChange("relevance")}
        />

        <SortLink
          title={window.Drupal.t("Year", {}, {context: "Search"})}
          active={currentSort === "year"}
          ascending={sortOrderAscending}
          ariaLabel={window.Drupal.t("Sort by year", {}, {context: "Search"})}
          onPress={() => onSortChange("year")}
        />

        <SortLink
          title={window.Drupal.t("Created", {}, {context: "Search"})}
          active={currentSort === "created"}
          ascending={sortOrderAscending}
          ariaLabel={window.Drupal.t("Sort by creation date", {}, {context: "Search"})}
          onPress={() => onSortChange("created")}
        />
      </ul>
    </div>
  )
}

export default SortLinks;