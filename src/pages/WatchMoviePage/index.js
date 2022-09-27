import { useLocation } from 'react-router-dom';

function WatchMoviePage() {
    const location = useLocation();
    const idVideo = location.pathname.replace('/', '');
    return (
        <iframe
            title="Movie"
            width="100%"
            className="w-[100vw] h-[calc(100vh-64px)]"
            height="100%"
            src={`https://www.2embed.to/embed/tmdb/movie?id=${idVideo}`}
        ></iframe>
    );
}

export default WatchMoviePage;
