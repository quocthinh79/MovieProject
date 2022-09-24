import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

function SearchResultItem({ children, media_type = '', id }) {
    return (
        <Link to={media_type != '' ? `/search/${media_type}/query=${id}` : `/search`}>
            <div className="wrap border-b-2 hover:bg-[#aaaaaa21] cursor-pointer">
                <div className="content mx-[15%] flex items-center">
                    <div className="flex justify-center aspect-square  items-center p-3 pointer-events-none">
                        {media_type === 'tv' ? (
                            <img className="h-8" alt="movie" src={images.tvIcon} />
                        ) : media_type === 'movie' ? (
                            <img className="h-8" alt="movie" src={images.movieIcon} />
                        ) : media_type === 'person' ? (
                            <img className="h-8" alt="movie" src={images.personIcon} />
                        ) : (
                            <img className="h-8" alt="movie" src={images.searchIcon} />
                        )}
                    </div>
                    <div className="flex items-center text-left py-1 w-full">{children}</div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResultItem;
