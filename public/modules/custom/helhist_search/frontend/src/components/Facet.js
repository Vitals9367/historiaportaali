import React from 'react';
import { Combobox } from 'hds-react/components/Combobox';

const Facet = ({ name, values }) => (
  <Combobox
    required
    label="Valitse ilmiö"
    placeholder="Valitse ilmiö"
    toggleButtonAriaLabel="Toggle menu"
    options={values}
  />
)

export default Facet;