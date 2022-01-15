import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'hds-react/components/Button';
import { getAutocompleteResults } from '../helpers/autocomplete';
import { scrollTo } from '../helpers/scrollTo';
import EraSelector from './EraSelector';
import Facet from './Facet';

const SearchForm = ({
  searchKeywords,
  setSearchKeywords,
  facets,
  activeFacets,
  onFacetChange,
  selectedEra,
  setSelectedEra,
  resetSearch,
  searchHasFilters,
  resultsRef
}) => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      "keywords": searchKeywords,
      "startYear": selectedEra.startYear,
      "endYear": selectedEra.endYear
    }
  });
  const watchKeywords = watch("keywords", "");

  const onSubmit = data => {
    const { keywords, startYear, endYear } = data;
    
    setSearchKeywords(keywords);
    setSelectedEra({startYear: startYear, endYear: endYear})

    scrollTo({
      ref: resultsRef,
      duration: 800
    })
  }

  const handleReset = () => {
    reset();
    resetSearch();
  }

  useEffect(() => {

    if (watchKeywords && watchKeywords.length < 3) {
      return;
    } 

    //getAutocompleteResults(watchKeywords);
  }, [watchKeywords]);

  return (
    <div className="search-filters">
      <div className="container block__container">
        <div className="filters">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-item hds-text-input">
              <label htmlFor="keywords">{window.Drupal ? window.Drupal.t("Search from content", {}, {context: "Search"}) : "Search from content"}</label>
              <div className="hds-text-input__input-wrapper">
                <input placeholder={window.Drupal ? window.Drupal.t("Location, person, topic, event...", {}, {context: "Search"}) : "Location, person, topic, event..."} className="form-text hds-text-input__input ui-autocomplete-input" data-search-api-autocomplete-search="search" type="text" name="keywords" {...register("keywords")} />
              </div>
            </div>

            <div className="form-actions">
              <Button type="submit" className="form-submit">{window.Drupal ? window.Drupal.t("Search", {}, {context: "Search"}) : "Search"}</Button>
              {searchHasFilters && (
                <Button type="reset" className="form-reset" onClick={() => handleReset()}>{window.Drupal ? window.Drupal.t("Clear", {}, {context: "Search"}) : "Clear"}</Button>
              )}
            </div>

            <h4>{window.Drupal ? window.Drupal.t("Filter results", {}, {context: "Search"}) : "Filter results"}</h4>

            <div className="form-item">
              <EraSelector
                register={register}
              />
            </div>

            {facets && facets.map(facet => (
              <div className="form-item" key={facet.name}>
                <Facet
                  name={facet.name}
                  values={facet.values.map(value => {return {label: value.filter}})}
                  selectedValues={activeFacets[facet.name]}
                  onFacetChange={onFacetChange}
                />
              </div>
            ))}
          </form>
        </div>
      </div>
      <div className="hds-koros hds-koros--flip-horizontal" style={{color: "#333333"}}>
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