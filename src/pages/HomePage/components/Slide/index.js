import { useEffect, useState } from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { apiConfigImage, apiConfigVideo, getTrailerOfMovie, getTrending } from '~/untils/request';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { FastAverageColor } from 'fast-average-color';
import Popup from '~/components/Popup';
import OverView from '~/components/OverView';
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
                'day',
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
            resGetTopRatedMovie
                .sort((a, b) => {
                    if (a.vote_average > b.vote_average) {
                        return -1;
                    }
                    if (a.vote_average < b.vote_average) {
                        return 1;
                    }
                    return 0;
                })
                .filter((value) => Math.round(value.vote_average * 10) >= 70)
                .map((item, index) => {
                    getAverageColor(apiConfigImage.originalImage(item.backdrop_path), item, index);
                });
            setListMovieTopRated(resGetTopRatedMovie.filter((value) => Math.round(value.vote_average * 10) >= 70));
        };

        fetchApi();
    }, []);

    const [heroSwiper, setSwiperRef] = useState(null);
    const [urlTrailer, setUrlTrailer] = useState([]);

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
        <div className="wrapper-slide h-1/2">
            <Swiper
                onSwiper={setSwiperRef}
                className="h-[calc(100vh-64px)]"
                modules={[Autoplay, Pagination]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 7000 }}
                touchMoveStopPropagation={true}
                pagination={{
                    clickable: true,
                }}
            >
                {listMovieTopRated.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <OverView
                                width={`100vw`}
                                height={`100%`}
                                linkBackGround={item.backdrop_path}
                                idMovie={item.id}
                                linkPoster={item.poster_path}
                                voteAverage={item.vote_average}
                                overview={item.overview}
                                titleMovie={item.title}
                                popup={
                                    <Popup
                                        height={`calc(100vh/1.1)`}
                                        width="calc(100vw/1.1)"
                                        titleVideo={item.title}
                                        textInButton={`Play trailer`}
                                        idVideo={item.id}
                                        getTrailer={getVideoTrailer}
                                        heroSlide={heroSwiper}
                                    >
                                        <iframe
                                            title={`${item.title}`}
                                            key={index}
                                            src={urlTrailer}
                                            width="100%"
                                            height="95%"
                                        ></iframe>
                                    </Popup>
                                }
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slide;
