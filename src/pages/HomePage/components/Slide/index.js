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
import Popup from '~/components/Popup';
import CircleRated from '~/components/Header/components/CircleRated';
import images from '~/assets/images';
import getAverageColor from 'get-average-color';
import { list } from 'postcss';
import { FastAverageColor } from 'fast-average-color';
function Slide() {
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

            async function getAverageColor(imgUrl, item, index) {
                const fac = new FastAverageColor();
                const img = document.createElement('img');
                img.src = imgUrl;
                img.crossOrigin = 'Anonymous';
                const color = await fac.getColorAsync(img).then((col) => {
                    return col;
                });
                const valueColor = { R: color.value[0], G: color.value[1], B: color.value[2] };
                const divBg = document.querySelector(`#div_bg_image_${item.id}`);
                divBg.style.background = `linear-gradient(to right, rgba(${valueColor.R}, ${valueColor.G}, ${valueColor.B}, 1) 150px, rgba(${valueColor.R}, ${valueColor.G}, ${valueColor.B}, 0.84) 100%)`;
            }
            resGetTopRatedMovie.slice(0, 10).map((item, index) => {
                getAverageColor(apiConfigImage.originalImage(item.backdrop_path), item, index);
            });
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
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 7000 }}
                // lazy={{ loadPrevNext: true }}
                touchMoveStopPropagation={true}
                pagination={{
                    clickable: true,
                }}
            >
                {listMovieTopRated.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <>
                                {/* <div>{item.valueColor.R}</div> */}
                                <div
                                    className="w-[100vw] h-full relative"
                                    style={{
                                        backgroundImage: `url(${apiConfigImage.originalImage(item.backdrop_path)})`,
                                        backgroundPosition: `center`,
                                        backgroundSize: `cover`,
                                    }}
                                >
                                    <div
                                        id={`div_bg_image_${item.id}`}
                                        className="h-full bg-center bg-cover brightness-[0.3]"
                                        // style={{
                                        //     background: `linear-gradient(to right, rgba(73.5, 52.5, 115.5, 1) 150px, rgba(73.5, 52.5, 115.5, 0.84) 100%)`,
                                        // }}
                                    ></div>
                                    <div className="poster absolute top-[50%] translate-y-[-50%] left-[calc(100vw/10)] flex ">
                                        <img
                                            className="h-[calc(100vh/1.5)] rounded-[15px]"
                                            src={apiConfigImage.w500Image(item.poster_path)}
                                        />
                                        <div className="ml-16 text-white font-bold text-left">
                                            <h1 className="text-8xl m-0 italic mb-8">{item.title}</h1>
                                            <div className="flex items-center">
                                                <CircleRated percent={item.vote_average} size={2} />
                                                <div className="mt-3 w-[45px] ml-4 mr-7">User Score</div>
                                                <button className="m-2 w-[46px] rounded-full aspect-square bg-[#032541] flex justify-center items-center">
                                                    <img
                                                        className="w-[16px] aspect-square"
                                                        src={images.addToListIcon}
                                                    />
                                                </button>
                                                <button className="m-2 w-[46px] rounded-full aspect-square bg-[#032541] flex justify-center items-center">
                                                    <img className="w-[16px] aspect-square" src={images.heartIcon} />
                                                </button>
                                                <button className="m-2 w-[46px] rounded-full aspect-square bg-[#032541] flex justify-center items-center">
                                                    <img
                                                        className="w-[16px] aspect-square"
                                                        src={images.addToWatchListIcon}
                                                    />
                                                </button>
                                                <button className="m-2 w-[46px] rounded-full aspect-square bg-[#032541] flex justify-center items-center">
                                                    <img className="w-[16px] aspect-square" src={images.startIcon} />
                                                </button>
                                            </div>
                                            <div className="mt-20 max-w-7xl">
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
