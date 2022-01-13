import React from 'react';
import { Select } from 'hds-react/components/Select';

const Facet = ({ name, values, selectedValues, onFacetChange }) => {
  const titleMap = {
    "aggregated_phenomena_title": "Valitse ilmiö",
    "aggregated_formats_title": "Valitse aineistolaji",
    "aggregated_neighbourhoods_title": "Valitse alue"
  };

  return (
    <Select
      multiselect
      required
      label={titleMap[name]}
      placeholder={titleMap[name]}
      options={values}
      value={selectedValues}
      clearButtonAriaLabel="Clear all selections"
      selectedItemRemoveButtonAriaLabel="Remove ${value}"
      onChange={(values) => onFacetChange(name, values)}
    />
  )
}

export default Facet;