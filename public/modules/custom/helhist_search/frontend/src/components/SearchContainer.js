import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_QUERY } from '../queries/queries.js';
import { prepareFacetsForQuery, prepareEraForQuery } from '../helpers/conditions.js';
import { prepareSortForQuery } from '../helpers/sort.js';
import { updateUrlParams } from '../helpers/url.js';
import { hasActiveFacets } from '../helpers/misc.js';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults';
import Pager from './Pager.js';

const SearchContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [facets, setFacets] = useState();
  const [activeFacets, setActiveFacets] = useState({});
  const [selectedEra, setSelectedEra] = useState({startYear: false, endYear: false});
  const [currentSort, setCurrentSort] = useState("relevance");
  const [sortOrderAscending, setSortOrderAscending] = useState(false);
  const [results, setResults] = useState();
  const [resultCount, setResultCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [executeQuery, { loading, error, data }] = useLazyQuery(SEARCH_QUERY);

  const resultsPerPage = 15;

  const resultsRef = useRef(null);

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

  const onSortChange = (newSort) => {
    if (currentSort === newSort) {
      setSortOrderAscending(prevState => !prevState);
    } else {
      setCurrentSort(newSort);
      setSortOrderAscending(false);
    }
  }

  const resetSearch = () => {
    setSearchKeywords("");
    setActiveFacets({});
    setCurrentPage(1);
    setCurrentSort("relevance");
    setSortOrderAscending(false);
  }

  // Execute search when parameters change
  useEffect(() => {
    executeSearch();
    updateUrlParams(searchKeywords, activeFacets, currentPage, currentSort, sortOrderAscending);
    hasActiveFacets();
  }, [searchKeywords, activeFacets, currentPage, currentSort, sortOrderAscending]);

  useEffect(() => {
    if (data && !loading) {
      setIsLoading(false);

      // Update results when query completes
      if (data?.searchAPISearch?.documents) {
        setResults(data.searchAPISearch.documents);
      }

      // Update result count
      if (data?.searchAPISearch?.result_count) {
        setResultCount(data.searchAPISearch.result_count);
      }

      // Update facets state
      if (data?.searchAPISearch?.facets) {
        setFacets(data.searchAPISearch.facets);
      }

      // Update total page count
      if (data?.searchAPISearch?.result_count) {
        setTotalPages(Math.ceil(data.searchAPISearch.result_count / resultsPerPage));
      }
    }
  }, [data, loading]);

  const executeSearch = () => {
    setIsLoading(true);

    const facetConditions = prepareFacetsForQuery(activeFacets);
    const eraConditions = prepareEraForQuery(selectedEra);
    const sort = prepareSortForQuery(currentSort, sortOrderAscending);

    executeQuery({
      variables: {
        keywords: searchKeywords,
        limit: resultsPerPage,
        offset: (currentPage * resultsPerPage) - resultsPerPage,
        langcodes: ["fi"],
        facetConditions: facetConditions,
        eraConditions: eraConditions,
        sort: sort
      }
    });
  }

  if (error) {
    console.log(error);
    return (
      <div>Error :(</div>
    )
  }

  const containerClasses = `search-wrapper ${isLoading ? 'is-loading' : ''}`;

  return (
    <div className={containerClasses}>
      <SearchForm 
        setSearchKeywords={setSearchKeywords}
        searchKeywords={searchKeywords}
        facets={facets}
        activeFacets={activeFacets}
        onFacetChange={onFacetChange}
        selectedEra={selectedEra}
        onEraChange={onEraChange}
        executeSearch={executeSearch}
        resetSearch={resetSearch}
        searchHasFilters={searchKeywords[0] || hasActiveFacets(activeFacets)}
        resultsRef={resultsRef}
      />

      <div className="search-results-container">
        <SearchResults
          searchKeywords={searchKeywords}
          results={results}
          resultCount={resultCount}
          currentSort={currentSort}
          onSortChange={onSortChange}
          sortOrderAscending={sortOrderAscending}
          innerRef={resultsRef}
          isLoading={isLoading}
        />

        {totalPages > 1 && (
          <Pager
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  )
  
}

export default SearchContainer;