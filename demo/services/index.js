import axios from "axios";
import linkifyIt from 'linkify-it';
import tlds from 'tlds';
import urlMetadata from 'url-metadata';

const linkify = linkifyIt().tlds(tlds);
const ACCESS_TOKEN = '451144149941482';
const GET_SUPERHERO_LIST = "/search";

const AxiosClient = axios.create({
  baseURL: `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}`,
});

export const getFilteredSuperHeros = async (query) => {
  const filterBy = query.split(' ').join('-');
  const response = await AxiosClient.get(`${GET_SUPERHERO_LIST}/${filterBy}`);
  if(response.status === 200) {
    const filteredSuperHeros = (response.data.results || []).map((data) => ({
      id: data.id,
      name: data.name,
      intro: data.work.base,
      image: data.image.url,
      viewText: data.name
    }));
    return filteredSuperHeros;
  } else {
    return [];
  }
};

export const getURLMetaInfo =  async (url) => {
  const matchArr = linkify.match(url);
  const href = matchArr && matchArr[0] ? matchArr[0].url : null;
  try {
  const data = await axios.get(`api/fetchMeta`, {
    params: {
      url: href
    }
  });
  return {
    'type': data.data['og:type'],
    'url': data.data['og:url'],
    'title': data.data['title'],
    'description': data.data['description'],
    'image': data.data['og:image'],
  };
  } catch(e) {
    console.log(e);
  }
};

export const saveData = async (data) => {
  try {
    await axios.post(`api/updateDB`, {
      data
    });
  } catch(e) {
    console.log(e);
  }
};

export const getURLMeta = (entities) => {
  const urlLists = [];
  Object.keys(entities || {}).forEach((key) => {
    if (entities[key]?.type === 'url') {
      urlLists.push(entities[key]);
    }
  });
  return urlLists[0];
};