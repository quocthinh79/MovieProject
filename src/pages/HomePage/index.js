import { useEffect, useState } from 'react';
import { getPopularMovie } from '~/untils/request';
import GeneralBigItem from './components/GeneralBigItem';
import Slide from './components/Slide';

function HomePage() {
    const [popularMovie, setPopularMovie] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const resPopularMovie = await getPopularMovie({
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                },
            });
            setPopularMovie(resPopularMovie);
        };
        fetchApi();
    }, []);

    return (
        <>
            <Slide />
            <GeneralBigItem
                inputList={popularMovie}
                title={`What's Popular`}
                headingOne={`Movie`}
                headingTwo={`TV`}
                typeMedia="movie"
            />
        </>
    );
}

export default HomePage;
