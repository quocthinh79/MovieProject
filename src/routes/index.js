import HomePage from '~/pages/HomePage';
import React from 'react';

const LoginPage = React.lazy(() => import('~/pages/LoginPage'));
const Movie = React.lazy(() => import('~/pages/Movie'));
const PeoplePage = React.lazy(() => import('~/pages/PeoplePage'));
const SearchPage = React.lazy(() => import('~/pages/SearchPage'));
const SignUpPage = React.lazy(() => import('~/pages/SignUpPage'));
const TV = React.lazy(() => import('~/pages/TV'));
const WatchMoviePage = React.lazy(() => import('~/pages/WatchMoviePage'));

const publicRoute = [
    { path: '/', component: HomePage },
    { path: '/movie', component: Movie },
    { path: '/tv', component: TV },
    { path: '/person', component: PeoplePage },
    { path: '/search', component: SearchPage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignUpPage },
    { path: '/:idMovie', component: WatchMoviePage },
];

const privateRoute = [];

export { publicRoute, privateRoute };
