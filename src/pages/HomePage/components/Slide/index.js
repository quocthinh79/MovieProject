import { useEffect, useState } from 'react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { apiConfigImage, apiConfigVideo, getTrailerOfMovie, getTrending } from '~/untils/request';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
function Slide() {
    //     SwiperCore.use([Autoplay]);

    const [listMovieTopRated, setListMovieTopRated] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const resGetTopRatedMovie = await getTrending(
                {
                    params: {
                        api_key: process.env.REACT_APP_API_KEY,
                    },
                },
                'movie',
                'week',
            );
            setListMovieTopRated(resGetTopRatedMovie.slice(0, 10));
        };

        fetchApi();
    }, []);

    const [showPopup, setShowPopup] = useState(false);
    const [idMovieShow, setIdMovieShow] = useState(null);
    const [heroSwiper, setSwiperRef] = useState(null);

    const closePopupTrailer = (itemOfListMovie) => {
        const divWrapTrailer = document.querySelector(`#id_movie_${itemOfListMovie.id}`);
        divWrapTrailer.querySelector(`#id_movie_${itemOfListMovie.id} > iframe`).setAttribute('src', '');
        setIdMovieShow(itemOfListMovie.id);
        heroSwiper.autoplay.start();
        setShowPopup(false);
    };

    const showPopupTrailer = async (itemOfListMovie) => {
        setIdMovieShow(itemOfListMovie.id);
        const res = await getTrailerOfMovie(
            {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                },
            },
            itemOfListMovie.id,
        );
        const divWrapTrailer = document.querySelector(`#id_movie_${itemOfListMovie.id}`);
        if (res.length > 0) {
            const videoTrailer = apiConfigVideo.youtubeEmbed(res[0].key);
            divWrapTrailer.querySelector(`#id_movie_${itemOfListMovie.id} > iframe`).setAttribute('src', videoTrailer);
        } else {
            divWrapTrailer.innerHTML('Trailer not found');
        }
        heroSwiper.autoplay.stop();
        setShowPopup(true);
    };

    return (
        <div className="wrapper-slide h-1/2">
            <Swiper
                onSwiper={setSwiperRef}
                className="h-[calc(100vh-64px)]"
                modules={[Autoplay, Pagination]}
                grabCursor={true}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 7000 }}
                lazy={{ loadPrevNext: true }}
                touchMoveStopPropagation={true}
                pagination={{
                    clickable: true,
                }}
            >
                {listMovieTopRated.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <>
                                <div className="w-[100vw] h-full relative">
                                    <div
                                        className="h-full bg-center bg-cover brightness-[0.3]"
                                        style={{
                                            backgroundImage: `url(${apiConfigImage.originalImage(item.backdrop_path)})`,
                                        }}
                                    ></div>
                                    <div className="poster absolute top-[50%] translate-y-[-50%] left-[calc(100vw/10)] flex ">
                                        <img
                                            className="h-[calc(100vh/1.5)] rounded-[15px]"
                                            src={apiConfigImage.w500Image(item.poster_path)}
                                        />
                                        <div className="ml-16 text-white font-bold text-left ">
                                            <h1 className="text-8xl m-0 italic">{item.title}</h1>
                                            <div className="mt-12 max-w-7xl">
                                                <span>Overview</span>
                                                <p className="font-normal mt-2">{item.overview}</p>
                                            </div>
                                            <div className="mt-16">
                                                <Button linear={true}>Watch Now</Button>
                                                <Button onClickShowPopup={() => showPopupTrailer(item)}>
                                                    Play Trailer
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id={`id_movie_${item.id}`}
                                        className={`${
                                            showPopup && idMovieShow === item.id ? 'flex' : 'hidden'
                                        } w-[calc(100vw/2)] h-[calc(100vh/1.5)] bg-black top-[50%]  translate-y-[-50%] left-[50%] translate-x-[-50%] absolute justify-center items-center`}
                                    >
                                        <iframe key={index} src="" width="100%" height="90%"></iframe>
                                        <FontAwesomeIcon
                                            onClick={() => closePopupTrailer(item)}
                                            icon={faClose}
                                            size="2x"
                                            className="top-0 right-0 absolute text-white cursor-pointer aspect-square"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slide;
