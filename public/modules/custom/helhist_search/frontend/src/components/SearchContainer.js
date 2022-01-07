import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_NODES } from '../queries/queries.js';
import ResultCard from './ResultCard.js';

const SearchContainer = () => {
  const { loading, error, data } = useQuery(GET_NODES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  console.log(data.searchAPISearch);

  return (
    <div className="search-results">
      <h4>Tuloksia: {data.searchAPISearch.result_count}</h4>
      {data.searchAPISearch.documents.map(result => {
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
  
}

export default SearchContainer;