import { API_URL } from '../constants/constants.js';

const fetchAutocompleteSuggestions = async (searchQuery) => {
  try {
    const formData = new FormData();
    formData.append("s", searchQuery);

    const res = await fetch(`${API_URL}/search_api_autocomplete/search?display=page&filter=s&q=${searchQuery}`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const message = `An error has occured: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log('Error: ' + err.message);
  }
}

export { fetchAutocompleteSuggestions }