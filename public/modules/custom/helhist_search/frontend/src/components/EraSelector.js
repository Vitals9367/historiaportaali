import React from 'react';
import { Accordion } from 'hds-react/components/Accordion';
import { TextInput } from 'hds-react/components/TextInput';

const EraSelector = ({  register }) => {
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
        {...register("startYear")}
      />
      <TextInput
        id="endDate"
        label="Lopetusvuosi"
        placeholder="1900"
        {...register("endYear")}
      />
    </Accordion>
  )
}

export default EraSelector;