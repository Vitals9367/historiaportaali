import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_QUERY } from '../queries/queries.js';
import { prepareFacetsForQuery, prepareEraForQuery } from '../helpers/conditions.js';
import { updateUrlParams } from '../helpers/url.js';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults';
import Pager from './Pager.js';

const SearchContainer = () => {
  const [results, setResults] = useState();
  const [searchKeywords, setSearchKeywords] = useState([""]);
  const [facets, setFacets] = useState();
  const [activeFacets, setActiveFacets] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEra, setSelectedEra] = useState({startYear: false, endYear: false});
  const [executeQuery, { loading, error, data }] = useLazyQuery(SEARCH_QUERY);

  const resultsPerPage = 15;

  const onFacetChange = (name, values) => {
    setActiveFacets({...activeFacets, [name]: values});
    setCurrentPage(1);
  }

  const onEraChange = (key, value) => {
    setSelectedEra({...selectedEra, [key]: value});
  }

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  // Execute search on facet change
  useEffect(() => {
    executeSearch();
    updateUrlParams(activeFacets, currentPage);
  }, [activeFacets, currentPage]);

  useEffect(() => {
    // Update results when query completes
    if (data?.searchAPISearch?.documents) {
      setResults(data.searchAPISearch.documents);
    }

    // Update facets state
    if (data?.searchAPISearch?.facets) {
      setFacets(data.searchAPISearch.facets);
    }

    // Update total page count
    if (data?.searchAPISearch?.result_count) {
      setTotalPages(Math.ceil(data.searchAPISearch.result_count / resultsPerPage));
    }
  }, [data]);

  if (error) {
    console.log(error);
    return (
      <div>Error :(</div>
    )
  }

  const executeSearch = () => {
    const facetConditions = prepareFacetsForQuery(activeFacets);
    const eraConditions = prepareEraForQuery(selectedEra);

    executeQuery({
      variables: {
        keywords: searchKeywords,
        limit: resultsPerPage,
        offset: (currentPage * resultsPerPage) - resultsPerPage,
        langcodes: ["fi"],
        facetConditions: facetConditions,
        eraConditions: eraConditions
      }
    });
  }

  return (
    <div className="search-container">
      <SearchForm 
        setSearchKeywords={setSearchKeywords}
        searchKeywords={searchKeywords}
        facets={facets}
        activeFacets={activeFacets}
        onFacetChange={onFacetChange}
        selectedEra={selectedEra}
        onEraChange={onEraChange}
        executeSearch={executeSearch}
      />

      <SearchResults 
        results={results}
        resultCount={data?.searchAPISearch.result_count}
      />

      {totalPages > 1 && (
        <Pager 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
  
}

export default SearchContainer;