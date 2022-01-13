import React from 'react';
import SortLinks from './SortLinks.js';
import ResultCard from './ResultCard.js';

const SearchResults = ({ results, resultCount, currentSort, onSortChange, sortOrderAscending }) => (
  <div className="search-results">
    <div className="container view__container">
      <header>
        <div className="search-header__left">
          <h2>Hakutulokset</h2>
          <h3>{resultCount} tulosta haulle</h3>
        </div>
        <div className="search-header__right">
          <SortLinks
            currentSort={currentSort}
            onSortChange={onSortChange}
            sortOrderAscending={sortOrderAscending}
          />
        </div>
      </header>

      <div className="search-results-wrapper">        
        {results && results.map(result => {
          const type = (result.nid ? 'article' : 'media');
          return (
            <ResultCard
              key={(result.nid ? result.nid : result.mid)}
              type={type}
              title={result.title}
              imageUrl={result.image_url}
              formats={result.formats}
              phenomenon={result.phenomenon}
              startYear={result.start_year}
              url={result.url}
            />
          )
        })}
      </div>
    </div>
  </div>
)

export default SearchResults;