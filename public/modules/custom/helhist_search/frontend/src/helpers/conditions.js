const prepareFacetsForQuery = facets => {
  const articleValue = window.Drupal ? window.Drupal.t("Article", {}, {context: "Search"}) : "Article";

  let facetConditions = Object.keys(facets).map(name => {
    return facets[name].flatMap(value => {
      // Since "Article"-format selection is inside of Formats-facet but is not really
      // a Format -taxonomy term, we need to catch it here and ignore it
      if (name === "aggregated_formats_title" && value.label === articleValue) {
        return [];
      }

      return {
        "name": name,
        "value": value.label,
        "operator": "="
      }
    });
  });

  // Add content type condition to the query if "Article"-format is selected
  if ("aggregated_formats_title" in facets) {
    if (facets["aggregated_formats_title"].filter(val => val.label === articleValue).length > 0) {
      facetConditions[0].push({
        "name": "content_type",
        "value": "article",
        "operator": "="
      });
    }
  }

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