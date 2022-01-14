import React from 'react';
import { Accordion } from 'hds-react/components/Accordion';
import { TextInput } from 'hds-react/components/TextInput';

const EraSelector = ({  register }) => {
  return (
    <Accordion 
      card 
      border
      heading={window.Drupal ? window.Drupal.t("Select era", {}, {context: "Search"}) : "Select era"}
      style={{ maxWidth: '360px'}}
    >
      <TextInput
        id="startYear"
        label={window.Drupal ? window.Drupal.t("Start year", {}, {context: "Search"}) : "Start year"}
        placeholder="1820"
        {...register("startYear")}
      />
      <TextInput
        id="endYear"
        label={window.Drupal ? window.Drupal.t("End year", {}, {context: "Search"}) : "End year"}
        placeholder="1900"
        {...register("endYear")}
      />
    </Accordion>
  )
}

export default EraSelector;