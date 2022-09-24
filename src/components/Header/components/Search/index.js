import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowItemSearchResult } from '~/redux/showItemSearchResultSlice';
import { getSearchKeywords, getTrending } from '~/untils/request';
import HeaderSearch from '../HeaderSearch';
import SearchInput, { InputContext } from '../SearchInput';
import SearchResultItem from '../SearchResultItem';

function Search() {
    const [resultSearchKeyword, setResultSearchKeyWord] = useState([]);
    const resultSearchTrending = useSelector((state) => state.trending);
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const responseSearchKeywords = await getSearchKeywords({
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    query: 'one',
                },
            });
            setResultSearchKeyWord(responseSearchKeywords);
        };
        fetchApi();
    }, []);

    // const stateInputSearch = useSelector((state) => state);

    const wrapperRef = useRef(null);
    // const [showItemSearchResult, setShowItemSearchResult] = useState(true);
    const stateInRedux = useSelector((state) => state);
    const showItemSearchResultDispatch = useDispatch();
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // alert('You clicked outside of me!');
                // setShowItemSearchResult(false);
                showItemSearchResultDispatch(updateShowItemSearchResult(false));
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div ref={wrapperRef} className="search absolute left-0 right-0">
            <SearchInput></SearchInput>
            {stateInRedux.showItemSearchResult && !stateInRedux.inputSearch && <HeaderSearch />}
            {stateInRedux.searchKeyWord.length === 0 &&
                stateInRedux.showItemSearchResult &&
                resultSearchTrending.map((item, index) => {
                    let result;
                    if (index < 10) {
                        item.media_type === 'movie'
                            ? (result = (
                                  <SearchResultItem id={item.id} key={index} media_type={item.media_type}>
                                      {item.title}
                                  </SearchResultItem>
                              ))
                            : (result = (
                                  <SearchResultItem id={item.id} key={index} media_type={item.media_type}>
                                      {item.name}
                                  </SearchResultItem>
                              ));
                    }
                    return result;
                })}
            {stateInRedux.movie.map((item, index) => {
                if (index < 1) {
                    return (
                        <SearchResultItem id={item.id} key={index} media_type="movie">
                            {item.title}
                        </SearchResultItem>
                    );
                }
            })}
            {stateInRedux.tvShow.map((item, index) => {
                if (index < 1) {
                    return (
                        <SearchResultItem id={item.id} key={index} media_type="tv">
                            {item.name}
                        </SearchResultItem>
                    );
                }
            })}
            {stateInRedux.person.map((item, index) => {
                if (index < 1) {
                    return (
                        <SearchResultItem id={item.id} key={index} media_type="person">
                            {item.name}
                        </SearchResultItem>
                    );
                }
            })}
            {stateInRedux.searchKeyWord.map((item, index) => {
                if (index < 10) {
                    return (
                        <SearchResultItem id={item.id} key={index}>
                            {item.name}
                        </SearchResultItem>
                    );
                }
            })}
        </div>
    );
}

export default Search;
