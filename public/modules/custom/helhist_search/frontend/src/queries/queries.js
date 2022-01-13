import gql from 'graphql-tag';

const SEARCH_QUERY = gql`
  query SEARCH_QUERY($keywords: [String]!, $limit: Int!, $offset: Int!, $langcodes: [String]!, $facetConditions: [ConditionInput]) {
    searchAPISearch(
      index_id: "content_and_media", 
      fulltext: {keys: $keywords},
      language: $langcodes,
      range: {offset: $offset, limit: $limit},
      sort: {field: "aggregated_title", value: "asc"},
      facets: [
        {field: "aggregated_phenomena_title", limit: 0, operator: "=", min_count: 0, missing: false},
        {field: "aggregated_formats_title", limit: 0, operator: "=", min_count: 0, missing: false}
        {field: "aggregated_neighbourhoods_title", limit: 0, operator: "=", min_count: 0, missing: false}
      ],
      condition_group: {
        conjunction: AND,
        groups: [
          {
            conjunction: AND,
            conditions: $facetConditions
          }
        ]
      }
    ) {
      result_count
      documents {
        ... on ContentAndMediaDoc {
          nid,
          mid,
          title: aggregated_title,
          image_url: listing_image_url,
          formats: aggregated_formats,
          phenomenon: aggregated_phenomena_title,
          start_year: aggregated_start_year,
          image_url: listing_image_url,
          url
        }
      }
      facets {
        name
        values {
          count
          filter
        }
      }
    }
  }
`;

export { SEARCH_QUERY };