import { Link } from 'react-router-dom';

function PopperItem({ children, to }) {
    return (
        <Link to={to} className="py-[3px] pr-16 pl-6 hover:bg-[#f8f9fa] w-full text-left">
            {children}
        </Link>
    );
}

export default PopperItem;
