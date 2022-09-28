import PopperWrapper from '~/layouts/PopperWrapper';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import PopperItem from '../PopperItem';
import OptionCircleIcon from '~/assets/images/OptionCircleIcon';
import AddToListIcon from '~/assets/images/AddToListIcon';
import AddToWatchListIcon from '~/assets/images/AddToWatchListIcon';
import HeaderIcon from '~/assets/images/HeaderIcon';
import StartIcon from '~/assets/images/StartIcon';

function OptionCircle({ handleClickOption }) {
    return (
        <div
            onClick={handleClickOption}
            className="option absolute top-2 right-2 w-[1.5em] h-[1.5em] text-[1em] cursor-pointer "
        >
            <Tippy
                trigger="click"
                delay={[0, 450]}
                interactive="true"
                placement="bottom"
                render={(attrs) => (
                    <PopperWrapper>
                        <div className="flex flex-col items-start justify-center w-full" tabIndex="-1" {...attrs}>
                            <PopperItem iconLeft={<AddToListIcon />}>Add to list</PopperItem>
                            <PopperItem iconLeft={<HeaderIcon />}>Favorite</PopperItem>
                            <PopperItem iconLeft={<AddToWatchListIcon />}>Watchlist</PopperItem>
                            <PopperItem iconLeft={<StartIcon />}>Your rating</PopperItem>
                        </div>
                    </PopperWrapper>
                )}
            >
                <div className="w-full h-full">
                    <OptionCircleIcon />
                </div>
            </Tippy>
        </div>
    );
}

export default OptionCircle;
