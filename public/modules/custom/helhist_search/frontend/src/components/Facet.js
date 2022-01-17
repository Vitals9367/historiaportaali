import React from 'react';
import { Select } from 'hds-react/components/Select';

const Facet = ({ name, values, selectedValues, onFacetChange }) => {
  const titleMap = {
    "aggregated_phenomena_title": window.Drupal ? window.Drupal.t("Select phenomenon", {}, {context: "Search"}) : "Select phenomenon",
    "aggregated_formats_title": window.Drupal ? window.Drupal.t("Select format", {}, {context: "Search"}) : "Select format",
    "aggregated_neighbourhoods_title": window.Drupal ? window.Drupal.t("Select region", {}, {context: "Search"}) : "Select region"
  };

  // Prepend Format-selection with Article-option, but only if other formats isn't selected
  if (name === "aggregated_formats_title") {
    if (!selectedValues || selectedValues.length === 0 || selectedValues.filter(val => val?.key === "article").length > 0) {
      values = [{key: "article", label: window.Drupal ? window.Drupal.t("Article", {}, {context: "Search"}) : "Article"}, ...values];
    }
  }

  return (
    <Select
      multiselect
      required
      label={titleMap[name]}
      placeholder={titleMap[name]}
      options={values}
      defaultValue={selectedValues}
      clearButtonAriaLabel={window.Drupal ? window.Drupal.t("Clear all selections", {}, {context: "Search"}) : "Clear all selections"}
      selectedItemRemoveButtonAriaLabel="Remove ${value}"
      value={selectedValues ? selectedValues : []}
      onChange={(values) => onFacetChange(name, values)}
      theme={{
        "--dropdown-border-color-default": "transparent",
        "--dropdown-border-color-hover": "transparent"
      }}
    />
  )
}

export default Facet;