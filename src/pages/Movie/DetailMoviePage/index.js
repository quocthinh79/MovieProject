import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OverView from '~/components/OverView';
import Popup from '~/components/Popup';
import { apiConfigImage, apiConfigVideo, getDetailMovie, getTrailerOfMovie } from '~/untils/request';

function DetailMoviePage() {
    const params = useParams();
    const idMovie = params.id;
    const [urlTrailer, setUrlTrailer] = useState([]);
    const [detailMovie, setDetailMovie] = useState(null);

    useEffect(() => {
        const fetchApi = async (idMovie) => {
            const res = await getDetailMovie(
                {
                    params: {
                        api_key: process.env.REACT_APP_API_KEY,
                    },
                },
                idMovie,
            );
            setDetailMovie(res);
        };
        fetchApi(idMovie);
    }, [idMovie]);

    const getVideoTrailer = async (idVideo) => {
        const res = await getTrailerOfMovie(
            {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                },
            },
            idVideo,
        );
        setUrlTrailer(apiConfigVideo.youtubeEmbed(res[0].key));
    };

    return (
        <div className="wrapper-detail">
            <div className="header-detail h-[60vh]">
                {detailMovie && (
                    <OverView
                        width={`100vw`}
                        height={`100%`}
                        linkBackGround={apiConfigImage.w1920H800Image(detailMovie.backdrop_path)}
                        idMovie={detailMovie.id}
                        linkPoster={apiConfigImage.w300H450Image(detailMovie.poster_path)}
                        voteAverage={detailMovie.vote_average}
                        overview={detailMovie.overview}
                        titleMovie={detailMovie.title}
                        tagline={detailMovie.tagline}
                        genres={detailMovie.genres}
                        status={detailMovie.status}
                        release_date={detailMovie.release_date}
                        runtime={detailMovie.runtime}
                        popup={
                            <Popup
                                height={`calc(100vh/1.1)`}
                                width="calc(100vw/1.1)"
                                titleVideo={detailMovie.title}
                                textInButton={`Play trailer`}
                                idVideo={detailMovie.id}
                                getTrailer={getVideoTrailer}
                            >
                                <iframe
                                    title={`${detailMovie.title}`}
                                    key={detailMovie.id}
                                    src={urlTrailer}
                                    width="100%"
                                    height="95%"
                                ></iframe>
                            </Popup>
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default DetailMoviePage;
