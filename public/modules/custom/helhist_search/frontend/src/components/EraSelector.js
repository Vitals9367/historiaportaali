import React from 'react';
import { Accordion } from 'hds-react/components/Accordion';
import { TextInput } from 'hds-react/components/TextInput';
import { IconMinus } from 'hds-react/icons';

const EraSelector = ({ register }) => {
  return (
    <Accordion 
      card 
      border
      heading={window.Drupal ? window.Drupal.t("Select era", {}, {context: "Search"}) : "Select era"}
      className="search-filters__era-selector"
      theme={{
        '--border-color': 'transparent',
        '--background-color': 'var(--color-white)',
        '--padding-horizontal': 'var(--spacing-xs)',
        '--padding-vertical': 'var(--spacing-xs)',
        '--header-font-color': 'var(--placeholder-color)',
        '--header-font-size': 'var(--fontsize-body-l)',
        '--header-line-height': 'var(--lineheight-s)',
        '--header-focus-outline-color': 'var(--color-coat-of-arms)',
        '--button-size': '28px',
        '--content-font-color': 'var(--color-black-90)',
        '--content-font-size': 'var(--fontsize-body-m)',
        '--content-line-height': 'var(--lineheight-l)',
      }}
      style={{fontWeight: 400}}
    >
      <div className="year-input-container">
        <TextInput
          id="startYear"
          label={window.Drupal ? window.Drupal.t("Start year", {}, {context: "Search"}) : "Start year"}
          placeholder="1820"
          className="start-year-input"
          {...register("startYear")}
        />
        <div className="item-divider"><IconMinus className="icon" /></div>
        <TextInput
          id="endYear"
          label={window.Drupal ? window.Drupal.t("End year", {}, {context: "Search"}) : "End year"}
          placeholder="1900"
          className="end-year-input"
          {...register("endYear")}
        />
      </div>
    </Accordion>
  )
}

export default EraSelector;