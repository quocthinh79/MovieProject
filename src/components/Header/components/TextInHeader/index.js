import { Link } from 'react-router-dom';

function TextInHeader({ children, to }) {
    return (
        <Link className="text-white mx-10 font-[600]" to={to}>
            {children}
        </Link>
    );
}

export default TextInHeader;
