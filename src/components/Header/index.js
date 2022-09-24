import { faBell, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import PopperWrapper from '~/layouts/PopperWrapper';
import PopperItem from '../PopperItem';
import Search from './components/Search';
import { useState } from 'react';
import { getTrending } from '~/untils/request';
import { useDispatch, useSelector } from 'react-redux';
import { addTrending } from '~/redux/trendingSlice';
import { updateShowItemSearchResult } from '~/redux/showItemSearchResultSlice';

function Header() {
    const dispatch = useDispatch();

    const [showSearchResult, setShowSearchResult] = useState(false);

    const fetchApi = async () => {
        const resSearchTrending = await getTrending({
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        });
        resSearchTrending.map((item, index) => {
            dispatch(addTrending(item));
        });
    };

    const handleClickSearch = () => {
        setShowSearchResult((showSearchResult) => !showSearchResult);
        dispatch(updateShowItemSearchResult(true));
        if (!showSearchResult) {
            fetchApi();
        }
    };

    return (
        <>
            <header className="wrap w-[100vw] h-[64px] bg-[#032541] flex justify-center items-center">
                <div className="content h-16 w-full flex justify-center items-center">
                    <main className="main-content w-[70%] h-full flex justify-between">
                        <div className="header-left flex items-center">
                            <Link to="/">
                                <img className="h-[20px] w-[154px]" alt="logo" src={images.logoHeader} />
                            </Link>
                            <Tippy
                                delay={[0, 200]}
                                interactive="true"
                                placement="bottom-start"
                                render={(attrs) => (
                                    <PopperWrapper>
                                        <div
                                            className="flex flex-col items-start justify-center w-full"
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <PopperItem to={`movie/now-playing`}>Now Playing</PopperItem>
                                            <PopperItem to={`movie/upcoming`}>Upcoming</PopperItem>
                                            <PopperItem to={`movie/top-rated`}>Top Rated</PopperItem>
                                        </div>
                                    </PopperWrapper>
                                )}
                            >
                                <Link className="text-white mx-10 font-[600]" to="/movie">
                                    Movies
                                </Link>
                            </Tippy>

                            <Tippy
                                delay={[0, 450]}
                                interactive="true"
                                placement="bottom-start"
                                render={(attrs) => (
                                    <PopperWrapper>
                                        <div
                                            className="flex flex-col items-start justify-center w-full"
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <PopperItem to={`tv/airing-today`}>Airing Today</PopperItem>
                                            <PopperItem to={`tv/on-the-air`}>On The Air</PopperItem>
                                            <PopperItem to={`tv/top-rated`}>Top Rated</PopperItem>
                                        </div>
                                    </PopperWrapper>
                                )}
                            >
                                <Link className="text-white mx-10 font-[600]" to="/tv">
                                    TV Shows
                                </Link>
                            </Tippy>
                            <Link className="text-white mx-10 font-[600]" to="/person">
                                People
                            </Link>
                        </div>
                        <div className="header-right">
                            <ul className="h-full w-auto flex flex-nowrap items-center justify-end">
                                <li className="cursor-pointer aspect-square h-[30px] leading-[30px] border-2 rounded-md text-white">
                                    VI
                                </li>
                                <li className="relative py-2 cursor-pointer">
                                    <FontAwesomeIcon className="text-white mx-10" size="lg" icon={faBell} />
                                    <div className="rounded-[50%] absolute top-0 right-4 aspect-square h-[15px] text-[10px] bg-[#c61439] text-white">
                                        2
                                    </div>
                                </li>
                                <li className="cursor-pointer">
                                    <div className="aspect-square h-[40px] rounded-[50%] overflow-hidden ">
                                        <img alt="avatar" src={images.avatar} />
                                    </div>
                                </li>
                                <li className="px-10 cursor-pointer" onClick={handleClickSearch}>
                                    {showSearchResult ? (
                                        <FontAwesomeIcon
                                            className="text-[#01b4e4]  font-extrabold"
                                            size="2x"
                                            icon={faClose}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className="text-[#01b4e4]  font-extrabold"
                                            size="lg"
                                            icon={faSearch}
                                        />
                                    )}
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
            </header>
            {showSearchResult && <Search />}
        </>
    );
}

export default Header;
