import { useEffect, useState } from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { apiConfigImage, apiConfigVideo, getTrailerOfMovie, getTrending } from '~/untils/request';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Button from '~/components/Button';
import CircleRated from '~/components/Header/components/CircleRated';
import images from '~/assets/images';
import { FastAverageColor } from 'fast-average-color';
import Popup from '~/components/Popup';
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
                                ></div>
                                <div className="poster absolute top-[50%] translate-y-[-50%] left-[calc(100vw/10)] flex ">
                                    <img
                                        alt="Poster"
                                        className="h-[calc(100vh/1.5)] rounded-[15px]"
                                        src={apiConfigImage.w500Image(item.poster_path)}
                                        onError={(e) => (e.target.src = apiConfigImage.w500Image(item.poster_path))}
                                    />
                                    <div className="ml-16 text-white font-bold text-left">
                                        <h1 className="text-8xl m-0 italic mb-8">{item.title}</h1>
                                        <div className="flex items-center">
                                            <CircleRated percent={item.vote_average} size={2} />
                                            <div className="mt-3 w-[45px] ml-4 mr-7">User Score</div>
                                            <Button
                                                primaryShape={false}
                                                circle={true}
                                                tippy={true}
                                                iconBtnCircle={images.addToWatchListIcon}
                                                content="Add to list"
                                                placement="bottom"
                                            ></Button>
                                            <Button
                                                primaryShape={false}
                                                circle={true}
                                                tippy={true}
                                                iconBtnCircle={images.heartIcon}
                                                content="Mark as favorite"
                                                placement="bottom"
                                            ></Button>
                                            <Button
                                                primaryShape={false}
                                                circle={true}
                                                tippy={true}
                                                iconBtnCircle={images.addToWatchListIcon}
                                                content="Add your watchlist"
                                                placement="bottom"
                                            ></Button>
                                            <Button
                                                primaryShape={false}
                                                circle={true}
                                                tippy={true}
                                                iconBtnCircle={images.startIcon}
                                                content="Rate it!"
                                                placement="bottom"
                                            ></Button>
                                        </div>
                                        <div className="mt-20 max-w-7xl">
                                            <span>Overview</span>
                                            <p className="font-normal mt-2">{item.overview}</p>
                                        </div>
                                        <div className="mt-16">
                                            <Button linear={true} to={`/${item.id}`}>
                                                Watch Now
                                            </Button>
                                            <Popup
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slide;
