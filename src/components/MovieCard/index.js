import { useEffect, useRef, useState } from 'react';
import images from '~/assets/images';
import { apiConfigImage } from '~/untils/request';
import CircleRated from '../Header/components/CircleRated';
import OptionCircle from '../OptionCircle';

function MovieCard({
    urlBackGroundMovie = null,
    urlAvatarCast = null,
    titleMovie,
    releaseDate,
    voteAverage,
    routerLinkToPage,
    nameCast = null,
    nameCharacter = null,
    borderBool = false,
}) {
    const [blur, setBlur] = useState(false);
    const handleClickOption = (boolean) => {
        setBlur(boolean);
    };

    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current) {
                setBlur(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);
    return (
        <div
            className="w-[150px] h-[350px] ml-10 rounded-[8px] relative"
            style={{ border: `${borderBool ? `1px solid #ccc` : ''}`, boxShadow: `0 2px 8px rgb(0 0 0 / 10%)` }}
        >
            <div className="w-full h-[225px] rounded-[8px] relative">
                <a href={`/${routerLinkToPage}`}>
                    <img
                        className="w-full h-full rounded-[8px]"
                        src={`${apiConfigImage.w220H330Image(`${urlBackGroundMovie || urlAvatarCast}`)}`}
                        onError={(e) =>
                            urlBackGroundMovie
                                ? (e.target.src = apiConfigImage.w220H330Image(`${urlBackGroundMovie}`))
                                : (e.target.src = images.people)
                        }
                    />
                </a>
                {urlBackGroundMovie && <OptionCircle handleClickOption={handleClickOption} />}
                {urlBackGroundMovie && (
                    <div className="absolute bottom-[calc(-38px/2)] left-4">
                        <CircleRated percent={voteAverage} />
                    </div>
                )}
            </div>
            <div className="content pt-[26px] pb-[12px] px-[10px] text-left">
                <a href={routerLinkToPage}>
                    <h2 className="font-bold hover:text-[#01b4e5]">{titleMovie || nameCharacter}</h2>
                </a>
                <span>{releaseDate || nameCast}</span>
            </div>
            {blur && (
                <div
                    ref={wrapperRef}
                    style={{ backdropFilter: `blur(20px)` }}
                    className="absolute top-0 left-0 right-0 bottom-0 rounded-[8px] opacity-100"
                ></div>
            )}
        </div>
    );
}

export default MovieCard;
