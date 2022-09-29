import { useEffect, useState } from 'react';
import { getPopularMovie, getTrending } from '~/untils/request';
import GeneralBigItem from './components/GeneralBigItem';
import Slide from './components/Slide';

function HomePage() {
    const [popularMovie, setPopularMovie] = useState([]);
    const [treding, setTrending] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const resPopularMovie = await getPopularMovie({
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                },
            });
            setPopularMovie(resPopularMovie);
            const resTrending = await getTrending(
                {
                    params: {
                        api_key: process.env.REACT_APP_API_KEY,
                    },
                },
                'movie',
                'day',
            );
            setTrending(resTrending);
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
            <GeneralBigItem
                slidesPerView={4}
                shortVideoCard={true}
                inputList={treding}
                title={`Trailer`}
                headingOne={`Today`}
                headingTwo={`This Week`}
                typeMedia="movie"
                textColor="#fff"
                colorTitleOne="#000"
                borderInTitile="#1ed5a9"
                backgroundTitleOne="#1ed5a9"
            />
            <GeneralBigItem
                inputList={treding}
                title={`Trending`}
                headingOne={`Today`}
                headingTwo={`This Week`}
                typeMedia="movie"
            />
        </>
    );
}

export default HomePage;
