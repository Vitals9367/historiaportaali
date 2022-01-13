import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_QUERY } from '../queries/queries.js';
import { prepareFacetsForQuery } from '../helpers/facets.js';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults';

const SearchContainer = () => {
  const [searchKeywords, setSearchKeywords] = useState([]);
  const [facets, setFacets] = useState();
  const [activeFacets, setActiveFacets] = useState({});
  const [executeQuery, { loading, error, data }] = useLazyQuery(SEARCH_QUERY);

  const onFacetChange = (name, values) => {
    setActiveFacets({...activeFacets, [name]: values});
  }

  const executeSearch = (keywords) => {
    if (keywords) {
      setSearchKeywords(keywords);
    }

    const facetConditions = prepareFacetsForQuery(activeFacets);

    executeQuery({
      variables: {
        keywords: [keywords ? keywords : ""],
        limit: 20,
        offset: 0,
        langcodes: ["fi"],
        facetConditions: facetConditions
      }
    });
  }

  useEffect(() => {
    executeSearch();
  }, [activeFacets]);

  useEffect(() => {
    // Update facets state when query completes
    if (data?.searchAPISearch?.facets) {
      setFacets(data.searchAPISearch.facets);
    }
  }, [data]);

  if (error) {
    console.log(error);
    return (
      <div>Error :(</div>
    )
  }

  return (
    <div className="search-container">
      <SearchForm 
        searchKeywords={searchKeywords}
        facets={facets}
        activeFacets={activeFacets}
        onFacetChange={onFacetChange}
        executeSearch={executeSearch}
      />

      <SearchResults 
        results={data?.searchAPISearch.documents}
        resultCount={data?.searchAPISearch.result_count}
      />
    </div>
  )
  
}

export default SearchContainer;