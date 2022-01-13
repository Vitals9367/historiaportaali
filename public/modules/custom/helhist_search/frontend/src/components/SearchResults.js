import React from 'react';
import ResultCard from './ResultCard.js';

const SearchResults = ({ results, resultCount }) => (
  <div className="search-results">
    <div className="container view__container">
      <header>
        <h2>Hakutulokset</h2>
        <h3>{resultCount} tulosta haulle</h3>
      </header>

      <div className="search-results-wrapper">        
        {results && results.map(result => {
          console.log(results);
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