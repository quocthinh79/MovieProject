import HomePage from '~/pages/HomePage';
import Movie from '~/pages/Movie';
import PeoplePage from '~/pages/PeoplePage';
import TV from '~/pages/TV';

const publicRoute = [
    { path: '/', component: HomePage },
    { path: '/movie', component: Movie },
    { path: '/tv', component: TV },
    { path: '/person', component: PeoplePage },
];

const privateRoute = [];

export { publicRoute, privateRoute };
