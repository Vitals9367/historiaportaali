import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'hds-react/components/Button';
import { getAutocompleteResults } from '../helpers/autocomplete';
import EraSelector from './EraSelector';
import Facet from './Facet';

const SearchForm = ({ setSearchKeywords, facets, activeFacets, onFacetChange, selectedEra, onEraChange, executeSearch }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const watchKeywords = watch("keywords", "");

  const onSubmit = data => {
    const { keywords } = data;
    setSearchKeywords(keywords);
    executeSearch();
  }

  useEffect(() => {

    if (watchKeywords.length < 3) {
      return;
    } 

    getAutocompleteResults(watchKeywords);
  }, [watchKeywords]);

  return (
    <div className="search-form">
      <h4>Hakulomake</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-item hds-text-input">
          <label htmlFor="keywords">Hae sisällöstä</label>
          <div className="hds-text-input__input-wrapper">
            <input placeholder="Paikka, henkilö, aihe, tapahtuma..." className="form-text hds-text-input__input ui-autocomplete-input" data-search-api-autocomplete-search="search" type="text" name="keywords" {...register("keywords")} />
          </div>
        </div>

        <EraSelector
          selectedEra={selectedEra}
          onEraChange={onEraChange}
        />

        {facets && facets.map(facet => (
          <Facet
            key={facet.name}
            name={facet.name}
            values={facet.values.map(value => {return {label: value.filter}})}
            selectedValues={activeFacets[facet.name]}
            onFacetChange={onFacetChange}
          />
        ))}

        <div className="form-actions">
          <Button type="submit" color="#bd2f00">Hae</Button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm;