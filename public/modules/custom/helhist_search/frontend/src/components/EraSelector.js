import React from 'react';
import { Accordion } from 'hds-react/components/Accordion';
import { TextInput } from 'hds-react/components/TextInput';

const EraSelector = ({  register }) => {
  return (
    <Accordion 
      card 
      border
      heading={window.Drupal ? window.Drupal.t("Select era", {}, {context: "Search"}) : "Select era"}
      className="search-filters__era-selector"
      theme={{
        '--border-color': 'transparent',
        '--background-color': 'var(--color-white)',
        '--padding-horizontal': 'var(--spacing-m)',
        '--padding-vertical': 'var(--spacing-s)',
        '--header-font-color': 'var(--color-black-90)',
        '--header-font-size': 'var(--fontsize-body-m)',
        '--header-line-height': 'var(--lineheight-s)',
        '--button-size': '28px',
        '--button-border-color-hover': 'var(--color-coat-of-arms)',
        '--content-font-color': 'var(--color-black-90)',
        '--content-font-size': 'var(--fontsize-body-m)',
        '--content-line-height': 'var(--lineheight-l)',
      }}
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