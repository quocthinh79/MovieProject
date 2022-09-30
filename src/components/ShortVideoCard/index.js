import { useEffect, useState } from 'react';
import PlayIcon from '~/assets/images/PlayIcon';
import { getTrailerOfMovie } from '~/untils/request';
import OptionCircle from '../OptionCircle';

function ShortVideoCard({ urlBackGround, idVideo, textColor }) {
    const [titleVideo, setTitleVideo] = useState('');
    const [typeVideo, setTypeVideo] = useState('');
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getTrailerOfMovie(
                {
                    params: {
                        api_key: process.env.REACT_APP_API_KEY,
                    },
                },
                idVideo,
            );
            setTitleVideo(res[0].name);
            setTypeVideo(res[0].type);
        };
        fetchApi();
    }, [idVideo]);

    const [hover, setHover] = useState(false);

    return (
        <div className="relative w-[300px] h-auto ml-[30px]">
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="relative rounded-[8px] cursor-pointer hover:scale-[1.05]"
            >
                <img
                    className="object-cover rounded-[8px]"
                    src={`${urlBackGround}`}
                    onError={(e) => (e.target.src = urlBackGround)}
                />
                <OptionCircle />
                <PlayIcon className={`${hover ? `scale-[1.3]` : ''}`} />
            </div>
            <div className="mt-[10px] w-full h-auto text-center ">
                <div style={{ color: textColor }}>
                    <h2
                        className="text-[20px] font-bold hover:text-[#01b4e5] cursor-pointer overflow-hidden text-ellipsis"
                        style={{
                            display: `-webkit-box`,
                            WebkitLineClamp: `2`,
                            lineClamp: `2`,
                            WebkitBoxOrient: `vertical`,
                        }}
                    >
                        {titleVideo}
                    </h2>
                </div>
                <p style={{ color: textColor }} className="font-normal">
                    {typeVideo}
                </p>
            </div>
        </div>
    );
}

export default ShortVideoCard;
