import { Route, Routes } from 'react-router-dom';
import DetailMoviePage from './DetailMoviePage';
import GeneralMoviePage from './GeneralMoviePage';
import NowPlayingPage from './NowPlayingPage';
import TopRatePage from './TopRate';
import UpComingPage from './UpComingPage';

function Movie() {
    return (
        <Routes>
            <Route path={``} element={<GeneralMoviePage />} />
            <Route path={`now-playing`} element={<NowPlayingPage />} />
            <Route path={`upcoming`} element={<UpComingPage />} />
            <Route path={`top-rated`} element={<TopRatePage />} />
            <Route path={`:id`} element={<DetailMoviePage />} />
        </Routes>
    );
}

export default Movie;
