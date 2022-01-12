import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_QUERY } from '../queries/queries.js';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults';

const SearchContainer = () => {
  const [searchKeywords, setSearchKeywords] = useState([]);
  const [facets, setFacets] = useState({});
  const [executeQuery, { loading, error, data }] = useLazyQuery(SEARCH_QUERY);

  const executeSearch = (keywords) => {
    setSearchKeywords(keywords);

    executeQuery({
      variables: {
        keywords: [keywords],
        limit: 20,
        offset: 0,
        langcodes: ["fi"],
        facetConditions: [
          {"name": "aggregated_phenomena_title", "operator": "=", "value": "Arjen muuttuvat kasvot"},
          {"name": "aggregated_phenomena_title", "operator": "=", "value": "Tapahtumia vuoden ympäri"}
        ]
      }
    });
  }

  useEffect(() => {
    executeQuery({
      variables: {
        keywords: [],
        limit: 20,
        offset: 0,
        langcodes: ["fi"]
      }
    });
  }, []);

  if (error) return <div>Error :(</div>;

  return (
    <div className="search-container">
      <SearchForm 
        searchKeywords={searchKeywords}
        facets={data?.searchAPISearch.facets}
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