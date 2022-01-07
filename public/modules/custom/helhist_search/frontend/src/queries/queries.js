import gql from 'graphql-tag';

const GET_NODES = gql`
  query { 
    searchAPISearch(index_id: "content_and_media", fulltext:{keys: ["historia"]} language: "fi", range: {offset: 0, limit: 30}, sort: {field: "aggregated_title", value: "asc"}) {
      result_count
      documents {
        index_id
        ... on ContentAndMediaDoc {
          nid,
          mid,
          title: aggregated_title,
          image_url: listing_image_url,
          formats: aggregated_formats,
          phenomenon: aggregated_phenomenon,
          start_year: aggregated_start_year,
          image_url: listing_image_url,
          url
        }
      }
    }
  }
`;

export { GET_NODES };