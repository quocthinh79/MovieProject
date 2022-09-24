import { configureStore } from '@reduxjs/toolkit';
import trendingReducer from './trendingSlice';
import inputSearchReducer from './inputSearchSlice';
import showItemSearchResultReducer from './showItemSearchResultSlice';
import searchKeyWordReducer from './searchKeyWordSlice';
import movieReducer from './movieSlice';
import tvShowReducer from './tvShowSlice';
import personReducer from './personSlice';

export default configureStore({
    reducer: {
        trending: trendingReducer,
        inputSearch: inputSearchReducer,
        showItemSearchResult: showItemSearchResultReducer,
        searchKeyWord: searchKeyWordReducer,
        movie: movieReducer,
        tvShow: tvShowReducer,
        person: personReducer,
    },
});
