import HomePage from '~/pages/HomePage';
import Movie from '~/pages/Movie';
import NotFoundPage from '~/pages/NotFoundPage';
import PeoplePage from '~/pages/PeoplePage';
import SearchPage from '~/pages/SearchPage';
import TV from '~/pages/TV';

const publicRoute = [
    { path: '/', component: HomePage },
    { path: '/movie', component: Movie },
    { path: '/tv', component: TV },
    { path: '/person', component: PeoplePage },
    { path: '/search', component: SearchPage },
];

const privateRoute = [];

export { publicRoute, privateRoute };
