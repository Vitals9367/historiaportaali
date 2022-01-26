const prepareSortForQuery = (currentSort, sortOrderAscending) => {
  const sortFieldMap = {
    "relevance": "search_api_relevance",
    "year": "aggregated_start_year",
    "created": "aggregated_created"
  }

  return [{
    "field": sortFieldMap[currentSort],
    "value": sortOrderAscending ? "ASC" : "DESC"
  }]
}

export { prepareSortForQuery }