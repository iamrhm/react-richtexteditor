import axios from "axios";

const ACCESS_TOKEN = '451144149941482';
const GET_SUPERHERO_LIST = "/search";

const AxiosClient = axios.create({
  baseURL: `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}`,
});

export const getFilteredSuperHeros = async (query) => {
  const response = await AxiosClient.get(`${GET_SUPERHERO_LIST}/${query}`);
  console.log(response);
  if(response.status === 200) {
    const filteredSuperHeros = response.data.results.map((data) => ({
      id: data.id,
      name: data.name,
      intro: data.work.base,
      image: data.image.url,
      info: data,
    }));
    return filteredSuperHeros;
  } else {
    return [];
  }
}

export const getProfileImage = (id) => {

}