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

    return (
        <>
            <div className="relative w-[300px] h-auto ml-[30px]">
                <div className="relative rounded-[8px] cursor-pointer">
                    <img
                        className="object-cover rounded-[8px]"
                        src={`${urlBackGround}`}
                        onError={(e) => (e.target.src = urlBackGround)}
                    />
                    <OptionCircle />
                    <PlayIcon />
                </div>
                <div className="mt-[10px] w-full h-auto text-center ">
                    <a style={{ color: textColor }} href="">
                        <h2 className="text-[20px] font-bold hover:text-[#01b4e5]">{titleVideo}</h2>
                    </a>
                    <p style={{ color: textColor }} className="font-normal">
                        {typeVideo}
                    </p>
                </div>
            </div>
        </>
    );
}

export default ShortVideoCard;
