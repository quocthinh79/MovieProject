import DetailTVPage from './DetailTVPage';
import { Route, Routes } from 'react-router-dom';
import AiringToday from './AiringToday';
import OnTheAir from './OnTheAir';
import TopRatePage from './TopRate';
import GeneralTVPage from './GeneralTVPage';

function TV() {
    return (
        <Routes>
            <Route path={``} element={<GeneralTVPage />} />
            <Route path={`top-rated`} element={<TopRatePage />} />
            <Route path={`airing-today`} element={<AiringToday />} />
            <Route path={`on-the-air`} element={<OnTheAir />} />
            <Route path={`:id`} element={<DetailTVPage />} />
        </Routes>
    );
}

export default TV;
