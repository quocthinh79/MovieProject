import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '~/components/MovieCard';

function GeneralBigItem({ inputList, title, headingOne, headingTwo, typeMedia }) {
    const [heroSwiper, setSwiperRef] = useState(null);
    const [router, setRouter] = useState('');
    useEffect(() => {
        if (typeMedia === 'movie') {
            setRouter('movie');
        } else if (typeMedia === 'tv') {
            setRouter('tv');
        } else {
            setRouter('person');
        }
    }, [title]);
    return (
        <div className="my-12">
            <div className="flex items-center font-bold mx-12 mb-7">
                <h2 className="mr-5 text-[24px]">{title}</h2>
                <div className="w-auto h-[30px] flex items-center rounded-[30px] border-[1px] border-[#000]">
                    <div className="py-[3px] px-[20px] rounded-[30px] bg-[#032541]">
                        <a
                            href=""
                            style={{
                                background: `linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%)`,
                                WebkitBackgroundClip: `text`,
                                WebkitTextFillColor: `transparent`,
                            }}
                        >
                            {headingOne}
                        </a>
                    </div>
                    <div className="py-[3px] px-[20px] rounded-[30px] ">
                        <a href="">{headingTwo}</a>
                    </div>
                </div>
            </div>
            <Swiper
                slidesPerGroup={3}
                onSwiper={setSwiperRef}
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={10}
                autoplay={{ delay: 15000 }}
                touchMoveStopPropagation={true}
                parallax={true}
            >
                {inputList.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <MovieCard
                                routerLinkToPage={`${router}/${item.id}`}
                                urlBackGround={item.poster_path}
                                titleMovie={item.title}
                                releaseDate={item.release_date}
                                voteAverage={item.vote_average}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default GeneralBigItem;
