import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAutocompleteResults } from '../helpers/autocomplete';
import Facet from './Facet';

const SearchForm = ({ setSearchKeywords, facets, activeFacets, onFacetChange, executeSearch }) => {
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
          <input type="submit" className="button form-submit hds-button hds-button--primary" value="Hae" />
        </div>
      </form>
    </div>
  )
}

export default SearchForm;