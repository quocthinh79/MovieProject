import axios from 'axios';

const request = axios.create({
    baseURL: 'https://api.themoviedb.org/',
});

export const getSearchKeywords = async (options, urlApi = '3/search/keyword') => {
    const response = await request.get(urlApi, options);
    return response.data.results;
};

export const getTrending = async (options, urlApi = '3/trending', media_type = 'all', time_window = 'day') => {
    const response = await request.get(`${urlApi}/${media_type}/${time_window}`, options);
    return response.data.results;
};

export const getMovie = async (options, urlApi = '3/search/movie') => {
    const response = await request.get(urlApi, options);
    return response.data.results;
};

export const getTvShow = async (options, urlApi = '3/search/tv') => {
    const response = await request.get(urlApi, options);
    return response.data.results;
};

export const getPerson = async (options, urlApi = '3/search/person') => {
    const response = await request.get(urlApi, options);
    return response.data.results;
};

export default request;
