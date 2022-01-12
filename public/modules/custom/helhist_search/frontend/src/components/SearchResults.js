import React from 'react';
import ResultCard from './ResultCard.js';

const SearchResults = ({ results, resultCount }) => (
  <div className="search-results">
    <h4>Tuloksia: {resultCount}</h4>

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
)

export default SearchResults;