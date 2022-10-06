import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import { apiConfigImage } from '~/untils/request';
import Button from '../Button';
import CircleRated from '../Header/components/CircleRated';
import OverlayBackground from '../OverlayBackground';

function OverView({
    linkBackGround,
    idMovie,
    linkPoster,
    voteAverage,
    overview,
    titleMovie,
    popup,
    width,
    height,
    tagline = '',
    genres = [],
    status = '',
    release_date = '',
    runtime,
}) {
    return (
        <div
            className="relative"
            style={{
                width: width,
                height: height,
                backgroundImage: `url(${linkBackGround})`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
            }}
        >
            <OverlayBackground idMovie={idMovie} imgUrl={apiConfigImage.originalImage(linkBackGround)} />
            <div className="poster absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex w-[calc(100vw/1.1)] justify-center ">
                <img
                    alt="Poster"
                    className="rounded-[15px]"
                    src={linkPoster}
                    onError={(e) => (e.target.src = linkPoster)}
                />
                <div className="ml-16 text-white font-bold text-left">
                    <h1 className="text-8xl m-0 italic mb-3">
                        {titleMovie}&nbsp;
                        {release_date && <span className="opacity-80 font-normal not-italic">({release_date})</span>}
                    </h1>
                    <div className="mb-2 font-normal flex items-center">
                        {status && (
                            <>
                                <span>{status}</span>
                                <FontAwesomeIcon className="text-xs px-5" icon={faCircle} />
                            </>
                        )}
                        {genres.map((item, index) =>
                            index !== genres.length - 1 ? <span>{item.name},&nbsp;</span> : <span>{item.name}</span>,
                        )}
                        {genres.length >= 1 && <FontAwesomeIcon className="text-xs px-5" icon={faCircle} />}
                        {runtime && (
                            <span>
                                {Math.floor(runtime / 60)}h{runtime % 60}m
                            </span>
                        )}
                    </div>
                    <div className="flex items-center">
                        <CircleRated percent={voteAverage} size={2} />
                        <div className="mt-3 w-[45px] ml-4 mr-7">User Score</div>
                        <Button
                            primaryShape={false}
                            circle={true}
                            tippy={true}
                            iconBtnCircle={images.addToListIcon}
                            content="Add to list"
                            placement="bottom"
                        ></Button>
                        <Button
                            primaryShape={false}
                            circle={true}
                            tippy={true}
                            iconBtnCircle={images.heartIcon}
                            content="Mark as favorite"
                            placement="bottom"
                        ></Button>
                        <Button
                            primaryShape={false}
                            circle={true}
                            tippy={true}
                            iconBtnCircle={images.addToWatchListIcon}
                            content="Add your watchlist"
                            placement="bottom"
                        ></Button>
                        <Button
                            primaryShape={false}
                            circle={true}
                            tippy={true}
                            iconBtnCircle={images.startIcon}
                            content="Rate it!"
                            placement="bottom"
                        ></Button>
                    </div>
                    {tagline && <div className="font-[400] opacity-70 mt-5 italic">{tagline}</div>}
                    <div className="mt-10 max-w-7xl">
                        <span>Overview</span>
                        <p className="font-normal mt-2">{overview}</p>
                    </div>
                    <div className="mt-10">
                        <Button linear={true} to={`/${idMovie}`}>
                            Watch Now
                        </Button>
                        {popup}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverView;
