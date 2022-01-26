export const RESULTS_PER_PAGE = 16;

const currentUrl = window.location.protocol + '//' + window.location.host;
export const API_URL = (process.env.REACT_APP_STAGE === 'production') ? currentUrl : process.env.REACT_APP_DRUPAL_URL;