const updateUrlParams = (
  searchKeywords,
  activeFacets,
  selectedEra,
  currentPage,
  currentSort,
  sortOrderAscending
) => {
  const url = new URL(window.location);

  if (searchKeywords) {
    url.searchParams.set("s", searchKeywords);
  } else {
    url.searchParams.delete("s");
  }

  for (const [name, values] of Object.entries(activeFacets)) {
    // TODO: Extract Article-format to it's own parameter
    if (values.length > 0) {
      const sanitizedValues = values.map(value => value.label);
      const parameterValue = sanitizedValues.join(',');
      url.searchParams.set(name, parameterValue);
    } else {
      url.searchParams.delete(name);
    }
  }

  if (selectedEra.startYear) {
    url.searchParams.set("start_year", selectedEra.startYear);
  } else {
    url.searchParams.delete("start_year");
  }

  if (selectedEra.endYear) {
    url.searchParams.set("end_year", selectedEra.endYear);
  } else {
    url.searchParams.delete("end_year");
  }

  if (currentPage > 1) {
    url.searchParams.set("page", currentPage);
  } else {
    url.searchParams.delete("page");
  }
  
  url.searchParams.set("sort", currentSort);

  if (sortOrderAscending) {
    url.searchParams.set("sort_order", "ASC");
  } else {
    url.searchParams.set("sort_order", "DESC");
  }

  window.history.pushState({}, '', url);
}

const getInitialValueFromUrl = (key) => {
  const url = new URL(window.location);

  // TODO: FACETS!

  switch (key) {
    case "s":
      return url.searchParams.has("s") ? url.searchParams.get("s") : "";

    case "era":
      return {
        startYear: url.searchParams.has("start_year") ? url.searchParams.get("start_year") : "",
        endYear: url.searchParams.has("end_year") ? url.searchParams.get("end_year") : "",
      }

    case "sort":
      return url.searchParams.has("sort") ? url.searchParams.get("sort") : "relevance";

    case "sort_order":
      return url.searchParams.has("sort_order") && url.searchParams.get("sort_order") === "ASC" ? true : false;

    case "page":
      return url.searchParams.has("page") ? url.searchParams.get("page") : 1;

    case "facets":
      const activeFacets = {};
      const facetKeys = [
        "aggregated_phenomena_title",
        "aggregated_formats_title",
        "aggregated_neighbourhoods_title"
      ];

      facetKeys.forEach(key => {
        if (url.searchParams.has(key)) {
          const values = url.searchParams.get(key).split(",").map(value => ({label: value}));
          activeFacets[key] = values;
        } else {
          activeFacets[key] = [];
        }
      });

      return activeFacets;

    default:
      return false;
  }
}

export { updateUrlParams, getInitialValueFromUrl }