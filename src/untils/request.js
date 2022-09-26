import axios from 'axios';

const request = axios.create({
    baseURL: 'https://api.themoviedb.org/',
});

export const apiConfigImage = {
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};
export const apiConfigVideo = {
    youtubeEmbed: (idVideo) => `https://www.youtube.com/embed/${idVideo}`,
};

export const getSearchKeywords = async (options, urlApi = '3/search/keyword') => {
    const response = await request.get(urlApi, options);
    return response.data.results;
};

export const getTrending = async (options, media_type = 'all', time_window = 'day', urlApi = '3/trending') => {
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

export const getTopRatedMovie = async (options, urlApi = '3/movie/top_rated') => {
    const res = await request.get(urlApi, options);
    return res.data.results;
};

export const getTrailerOfMovie = async (options, idMovie, urlApi = '3/movie') => {
    const res = await request.get(`${urlApi}/${idMovie}/videos`, options);
    return res.data.results;
};

export default request;
