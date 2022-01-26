const hasActiveFacets = (activeFacets) => {
  if (!activeFacets) return false;

  const numOfActive = Object.keys(activeFacets).reduce((prevValue, currFacet) => {
    const numOfValues = activeFacets[currFacet].length;
    return prevValue + numOfValues;
  }, 0);
  return (numOfActive > 0) ? true : false;
}

export { hasActiveFacets }