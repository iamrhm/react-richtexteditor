import { getFilteredSuperHeros } from '../../../services';

async function fetchSuggestions(searchText) {
  searchText = searchText.replace('@', '')
  .trim().toLowerCase();
  if (searchText) {
    const suggestions = await getFilteredSuperHeros(searchText);
    return suggestions;
  }
  return [];
}

export default fetchSuggestions;