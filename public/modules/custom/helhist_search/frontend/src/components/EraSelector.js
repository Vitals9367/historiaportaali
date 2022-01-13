import React from 'react';
import { Accordion } from 'hds-react/components/Accordion';
import { TextInput } from 'hds-react/components/TextInput';

const EraSelector = ({ selectedEra, onEraChange }) => {
  return (
    <Accordion 
      card 
      border
      heading="Valitse ajanjakso"
      style={{ maxWidth: '360px'}}
    >
      <TextInput
        id="startDate"
        label="Aloitusvuosi"
        placeholder="1820"
        value={(selectedEra.startYear ? selectedEra.startYear : "")}
        onChange={(el) => onEraChange("startYear", el.target.value)}
      />
      <TextInput
        id="endDate"
        label="Lopetusvuosi"
        placeholder="1900"
        value={(selectedEra.endYear ? selectedEra.endYear : "")}
        onChange={(el) => onEraChange("endYear", el.target.value)}
      />
    </Accordion>
  )
}

export default EraSelector;