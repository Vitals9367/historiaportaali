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

export { prepareFacetsForQuery }