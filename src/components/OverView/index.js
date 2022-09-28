import images from '~/assets/images';
import { apiConfigImage } from '~/untils/request';
import Button from '../Button';
import CircleRated from '../Header/components/CircleRated';

function OverView({ linkBackGround, idMovie, linkPoster, voteAverage, overview, titleMovie, popup, width, height }) {
    return (
        <div
            className="relative"
            style={{
                width: width,
                height: height,
                backgroundImage: `url(${apiConfigImage.originalImage(linkBackGround)})`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
            }}
        >
            <div id={`div_bg_image_${idMovie}`} className="h-full bg-center bg-cover brightness-[0.3]"></div>
            <div className="poster absolute top-[50%] translate-y-[-50%] left-[calc(100vw/10)] flex ">
                <img
                    alt="Poster"
                    className="h-[calc(100vh/1.5)] rounded-[15px]"
                    src={apiConfigImage.w500Image(linkPoster)}
                    onError={(e) => (e.target.src = apiConfigImage.w500Image(linkPoster))}
                />
                <div className="ml-16 text-white font-bold text-left">
                    <h1 className="text-8xl m-0 italic mb-8">{titleMovie}</h1>
                    <div className="flex items-center">
                        <CircleRated percent={voteAverage} size={2} />
                        <div className="mt-3 w-[45px] ml-4 mr-7">User Score</div>
                        <Button
                            primaryShape={false}
                            circle={true}
                            tippy={true}
                            iconBtnCircle={images.addToWatchListIcon}
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
                    <div className="mt-20 max-w-7xl">
                        <span>Overview</span>
                        <p className="font-normal mt-2">{overview}</p>
                    </div>
                    <div className="mt-16">
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
