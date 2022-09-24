import { Route, Routes } from 'react-router-dom';
import SearchMoviePage from './SearchMoviePage';
import SearchMultiplePage from './SearchMultiplePage';
import SearchPersonPage from './SearchPersonPage';
import SearchTvPage from './SearchTvPage';

function SearchPage() {
    return (
        <Routes>
            <Route path={`/query=:keyword`} element={<SearchMultiplePage />} />
            <Route path={`/movie/query=:keyword`} element={<SearchMoviePage />} />
            <Route path={`/tv/query=:keyword`} element={<SearchTvPage />} />
            <Route path={`/person/query=:keyword`} element={<SearchPersonPage />} />
        </Routes>
    );
}

export default SearchPage;
