import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';

function HeaderSearch() {
    return (
        <div className="bg-[#aaaaaa21] border-b-2">
            <div className="wrap font-bold text-4xl flex justify-start items-center mx-[15%] py-3 ">
                <img className="w-8 h-8 inline-block mr-2" alt="Trending" src={images.trendingIcon} />
                <h2 className="inline-block ">Trending</h2>
            </div>
        </div>
    );
}

export default HeaderSearch;
