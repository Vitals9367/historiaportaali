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
    <div className="search-filters">
      <div className="container block__container">
        <div className="filters">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-item hds-text-input">
              <label htmlFor="keywords">Hae sisällöstä</label>
              <div className="hds-text-input__input-wrapper">
                <input placeholder="Paikka, henkilö, aihe, tapahtuma..." className="form-text hds-text-input__input ui-autocomplete-input" data-search-api-autocomplete-search="search" type="text" name="keywords" {...register("keywords")} />
              </div>
            </div>

            <h4>Rajaa hakutuloksia</h4>

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
      </div>
      <div className="hds-koros  hds-koros--flip-horizontal" style={{color: "#333333"}}>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="50" fill="currentColor">
          <defs>
            <pattern id="koros744682011" x="0" y="0" width="67" height="50" patternUnits="userSpaceOnUse">
              <polygon points="67 50 67 42.36 33.5 8.5 0 42.36 0 42.36 0 50 67 50"></polygon>
            </pattern>
          </defs>
          <rect fill="url(#koros744682011)" width="100%" height="50"></rect>
        </svg>
      </div>
    </div>
  )
}

export default SearchForm;