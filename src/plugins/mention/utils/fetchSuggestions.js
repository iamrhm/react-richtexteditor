import mockMentionData from '../../../__mocks__/data.json';

function fetchSuggestions(searchText) {
  searchText = searchText.replace('@', '');
  return mockMentionData
  .filter(data => data.title.toLowerCase().includes(searchText.toLowerCase()));
}

export default fetchSuggestions;