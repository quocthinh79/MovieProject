import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '~/components/MovieCard';
import Popup from '~/components/Popup';
import { apiConfigVideo, getTrailerOfMovie } from '~/untils/request';

function GeneralBigItem({
    textColor = '#000',
    inputList,
    title,
    headingOne,
    headingTwo,
    typeMedia,
    videoCard = false,
    borderInTitile = '#000',
    colorTitleOne = `linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%)`,
    backgroundTitleOne = `#032541`,
    slidesPerView = 6,
    slidesPerGroup = 3,
}) {
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

    const urlBackgroundOnHover = useSelector((state) => state.urlBackgroundOnHover);

    return (
        <div
            className="w-[70vw] h-auto relative m-auto block"
            style={{
                backgroundImage: `url(${videoCard ? urlBackgroundOnHover : ''})`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
            }}
        >
            {videoCard && (
                <div
                    className="absolute top-0 left-0 right-0 bottom-0"
                    style={{
                        background: `linear-gradient(to right, rgba(3, 37, 65, 0.75) 0%, rgba(3, 37, 65, 0.75) 100%)`,
                    }}
                ></div>
            )}
            <div className="my-12 relative py-12">
                <div className="flex items-center font-bold mx-12 mb-7">
                    <h2
                        className="mr-5 text-[24px]"
                        style={{
                            color: `${textColor}`,
                        }}
                    >
                        {title}
                    </h2>
                    <div
                        className="w-auto h-[30px] flex items-center rounded-[30px] border-[1px]"
                        style={{ borderColor: `${borderInTitile}` }}
                    >
                        <div
                            className="py-[3px] px-[20px] rounded-[30px]"
                            style={{ background: `${backgroundTitleOne}` }}
                        >
                            <a
                                href=""
                                style={{
                                    background: `${colorTitleOne}`,
                                    WebkitBackgroundClip: `text`,
                                    WebkitTextFillColor: `transparent`,
                                }}
                            >
                                {headingOne}
                            </a>
                        </div>
                        <div className="py-[3px] px-[20px] rounded-[30px] ">
                            <a style={{ color: `${textColor}` }} href="">
                                {headingTwo}
                            </a>
                        </div>
                    </div>
                </div>
                <Swiper
                    slidesPerView={slidesPerView}
                    slidesPerGroup={slidesPerGroup}
                    onSwiper={setSwiperRef}
                    modules={[Autoplay]}
                    grabCursor={true}
                    spaceBetween={0}
                    autoplay={{ delay: 15000 }}
                    touchMoveStopPropagation={true}
                    parallax={true}
                    className={`absolute left-[50%] translate-x-[-50%]`}
                >
                    {inputList.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) =>
                                !videoCard ? (
                                    <MovieCard
                                        routerLinkToPage={`${typeMedia}/${item.id}`}
                                        urlBackGround={item.poster_path}
                                        titleMovie={item.title}
                                        releaseDate={item.release_date}
                                        voteAverage={item.vote_average}
                                    />
                                ) : (
                                    <Popup
                                        height={`calc(100vh/1.1)`}
                                        width="calc(100vw/1.1)"
                                        shortVideoCard={true}
                                        idVideo={item.id}
                                        getTrailer={getVideoTrailer}
                                        heroSlide={heroSwiper}
                                        urlBackGround={item.backdrop_path}
                                        textColor={textColor}
                                    >
                                        <iframe
                                            title={`${item.name}`}
                                            key={index}
                                            src={urlTrailer}
                                            width="100%"
                                            height="95%"
                                        ></iframe>
                                    </Popup>
                                )
                            }
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default GeneralBigItem;
