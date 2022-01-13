const prepareFacetsForQuery = facets => {
  const facetConditions = Object.keys(facets).map(name => {
    return facets[name].map(value => (
      {
        "name": name,
        "value": value.label,
        "operator": "="
      }
    ));
  });

  return [].concat.apply([], facetConditions);
}

const prepareEraForQuery = era => {
  let conditions = [];

  if (era.startYear) {
    conditions.push({
      "name": "aggregated_start_year",
      "value": era.startYear,
      "operator": ">"
    });
  }

  if (era.endYear) {
    conditions.push({
      "name": "aggregated_end_year",
      "value": era.endYear,
      "operator": "<"
    });
  }

  return conditions;
}

export { prepareFacetsForQuery, prepareEraForQuery }