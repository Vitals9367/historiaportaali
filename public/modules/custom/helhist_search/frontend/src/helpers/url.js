const updateUrlParams = (activeFacets, currentPage, currentSort, sortOrderAscending) => {
  const url = new URL(window.location);

  for (const [name, values] of Object.entries(activeFacets)) {
    if (values.length > 0) {
      const sanitizedValues = values.map(value => value.label);
      const parameterValue = sanitizedValues.join(',');
      url.searchParams.set(name, parameterValue);
    } else {
      url.searchParams.delete(name);
    }
  }

  url.searchParams.set("page", currentPage);
  url.searchParams.set("sort", currentSort);

  if (sortOrderAscending) {
    url.searchParams.set("sort_order", "ASC");
  } else {
    url.searchParams.set("sort_order", "DESC");
  }

  window.history.pushState({}, '', url);
}

export { updateUrlParams }