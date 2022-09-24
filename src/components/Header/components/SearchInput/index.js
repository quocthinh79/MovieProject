import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import { updateInputSearch } from '~/redux/inputSearchSlice';
import { updateMovie } from '~/redux/movieSlice';
import { updatePerson } from '~/redux/personSlice';
import { updateSearchKeyWord } from '~/redux/searchKeyWordSlice';
import { updateShowItemSearchResult } from '~/redux/showItemSearchResultSlice';
import { updateTvShow } from '~/redux/tvShowSlice';
import { getMovie, getPerson, getSearchKeywords, getTvShow } from '~/untils/request';
import './SearchInput.scss';

function SearchInput() {
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 350);

    const dispatch = useDispatch();
    const stateInRedux = useSelector((state) => state);

    useEffect(() => {
        // if (!debounce.trim()) {
        //     setSearchResult([]);
        //     return;
        // }

        const fetchApi = async () => {
            // setLoading(true);
            const responseSearchKeywords = await getSearchKeywords({
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    query: debounce,
                },
            });

            const resGetMovie = await getMovie({
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    query: debounce,
                },
            });

            const resGetTvShow = await getTvShow({
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    query: debounce,
                },
            });
            const resPerson = await getPerson({
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    query: debounce,
                },
            });
            dispatch(updateSearchKeyWord(responseSearchKeywords));
            dispatch(updateMovie(resGetMovie));
            dispatch(updateTvShow(resGetTvShow));
            dispatch(updatePerson(resPerson));
            // setSearchResult(result);
            // setLoading(false);
        };

        if (debounce !== '' && debounce !== undefined && debounce !== null) {
            fetchApi();
        }
        if (debounce === '') {
            dispatch(updateSearchKeyWord([]));
            dispatch(updateMovie([]));
            dispatch(updateTvShow([]));
            dispatch(updatePerson([]));
        }
    }, [debounce]);

    const inputSearchDispatch = useDispatch();

    const handleChangeInputSearch = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue.startsWith(' ') ? searchValue.trim() : searchValue);
        inputSearchDispatch(updateInputSearch(searchValue.startsWith(' ') ? searchValue.trim() : searchValue));
    };

    const showItemSearchResultDispatch = useDispatch();
    const handleFocusInputSearch = () => {
        showItemSearchResultDispatch(updateShowItemSearchResult(true));
    };

    return (
        <div className="border-b-2">
            <div className="relative mx-[15%]">
                <div className="flex justify-center h-full aspect-square absolute inset-y-0 left-0 items-center p-3 pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                    autoFocus
                    onClick={handleFocusInputSearch}
                    onChange={handleChangeInputSearch}
                    type="search"
                    id="default-search"
                    className="italic block pl-16 p-4  w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for a movie, tv show, person..."
                    required
                />
            </div>
        </div>
    );
}

export default SearchInput;
