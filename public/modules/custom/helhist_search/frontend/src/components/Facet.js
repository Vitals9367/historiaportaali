import React from 'react';
import { Select } from 'hds-react/components/Select';

const Facet = ({ name, values, selectedValues, onFacetChange }) => {
  const titleMap = {
    "aggregated_phenomena_title": window.Drupal.t("Select phenomenon", {}, {context: "Search"}),
    "aggregated_formats_title": window.Drupal.t("Select format", {}, {context: "Search"}),
    "aggregated_neighbourhoods_title": window.Drupal.t("Select region", {}, {context: "Search"})
  };

  return (
    <Select
      multiselect
      required
      label={titleMap[name]}
      placeholder={titleMap[name]}
      options={values}
      defaultValue={selectedValues}
      clearButtonAriaLabel={window.Drupal.t("Clear all selections", {}, {context: "Search"})}
      selectedItemRemoveButtonAriaLabel="Remove ${value}"
      onChange={(values) => onFacetChange(name, values)}
    />
  )
}

export default Facet;