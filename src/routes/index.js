import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/LoginPage';
import Movie from '~/pages/Movie';
import PeoplePage from '~/pages/PeoplePage';
import SearchPage from '~/pages/SearchPage';
import SignUpPage from '~/pages/SignUpPage';
import TV from '~/pages/TV';

const publicRoute = [
    { path: '/', component: HomePage },
    { path: '/movie', component: Movie },
    { path: '/tv', component: TV },
    { path: '/person', component: PeoplePage },
    { path: '/search', component: SearchPage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignUpPage },
];

const privateRoute = [];

export { publicRoute, privateRoute };
