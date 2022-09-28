import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowItemSearchResult } from '~/redux/showItemSearchResultSlice';
import HeaderSearch from '../HeaderSearch';
import SearchInput from '../SearchInput';
import SearchResultItem from '../SearchResultItem';

function Search() {
    const resultSearchTrending = useSelector((state) => state.trending);

    const wrapperRef = useRef(null);
    const stateInRedux = useSelector((state) => state);
    const showItemSearchResultDispatch = useDispatch();
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                showItemSearchResultDispatch(updateShowItemSearchResult(false));
            }
        }
        window.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div ref={wrapperRef} className="search absolute left-0 right-0 z-[9999] bg-white h-fit">
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
            {stateInRedux.movie.length > 0 ? (
                <SearchResultItem id={stateInRedux.movie[0].id} key={stateInRedux.movie[0].id} media_type="movie">
                    {stateInRedux.movie[0].title}
                </SearchResultItem>
            ) : (
                <Fragment />
            )}
            {stateInRedux.tvShow.length > 0 ? (
                <SearchResultItem id={stateInRedux.tvShow[0].id} key={stateInRedux.tvShow[0].id} media_type="tv">
                    {stateInRedux.tvShow[0].name}
                </SearchResultItem>
            ) : (
                <Fragment />
            )}
            {stateInRedux.person.length > 0 ? (
                <SearchResultItem id={stateInRedux.person[0].id} key={stateInRedux.person[0].id} media_type="person">
                    {stateInRedux.person[0].name}
                </SearchResultItem>
            ) : (
                <Fragment />
            )}
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
